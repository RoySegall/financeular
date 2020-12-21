<?php

namespace Tests\Feature\Client;

use App\Models\Expense;
use App\Models\File;
use App\Models\Income;
use App\Models\Limitation;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

class FileProcessMutationTest extends TestCase
{

  use FinancularTestUtilsTrait;

  /**
   * @var \App\Models\User
   */
  protected $userFirst;

  /**
   * @var \App\Models\User
   */
  protected $userSecond;

  /**
   * @var \App\Models\File
   */
  protected $fileFirst;

  /**
   * @var \App\Models\File
   */
  protected $fileSecond;

  /**
   * Setting stuff for the test.
   */
  protected function setUp(): void {
    parent::setUp();

    // Create a two user.
    $this->userFirst = $this->createUser();
    $this->userSecond = $this->createUser();

    // Create files.
    $this->fileFirst = $this->createFile($this->userFirst);
    $this->fileSecond = $this->createFile($this->userSecond);
  }

  /**
   * Verify the access for an anonymous user.
   */
  public function testCheckAnonymousUser() {
    // The file ID does not matter.
    $results = $this->sendQuery("mutation { fileProcess(id: 1) { name }}");
    $this->assertEquals($results->json('errors')[0]['message'], 'You are not authorized to access fileProcess');
  }

  /**
   * Testing the response when mutating a file ID which not exists with a logged in user.
   */
  public function testLoggedInUserWithNotExistsFileId() {
    $access_token = $this->createAccessToken($this->userFirst);

    $results = $this->sendQuery("mutation { fileProcess(id: 0) { name }}", $access_token->accessToken);
    $this->assertEquals($results->json('errors')[0]['message'], 'No query results for model [App\Models\File] 0');
  }

  /**
   * Test Access for file: file which belong to the user and one which not.
   */
  public function testAccessForFile() {
    $options = [
      ['user' => $this->userFirst, 'shouldBeBlockedFor' => $this->fileSecond],
      ['user' => $this->userSecond, 'shouldBeBlockedFor' => $this->fileFirst],
    ];

    foreach ($options as $option) {

      $access_token = $this->createAccessToken($option['user']);
      $results = $this->sendQuery("mutation { fileProcess(id: {$option['shouldBeBlockedFor']->id}) { name }}", $access_token->accessToken);

      $this->assertEquals($results->json('errors')[0]['message'], 'You are not authorized to access fileProcess');
    }
  }

  /**
   * Test processing an invalid file.
   */
  public function testInvalidFile() {

    // Setting the pat of the invalid file for parsing.
    $this->fileFirst->path = $this->getPathsForFiles('invalid_file');
    $this->fileFirst->save();

    $this->assertEquals($this->fileFirst->status, File::STATUS_NEW);

    // Trigger the file process.
    $access_token = $this->createAccessToken($this->userFirst);
    $results = $this->sendQuery("mutation { fileProcess(id: {$this->fileFirst->id}) { name }}", $access_token->accessToken);

    $this->assertEquals(
      $results->json('errors')[0]['message'],
      'There was an error wile processing the file. Please contact costumer success'
    );

    $this->fileFirst->refresh();
    $this->assertEquals($this->fileFirst->status, File::STATUS_ERRORED);
    $this->assertEquals($this->fileFirst->errors, 'There was an error while trying to process the excel file.');
  }

  /**
   * Testing the happy flow - processing a valid file which belong to the user.
   */
  public function testValidFile() {
    // Setting the pat of the invalid file for parsing.
    $this->fileFirst->path = $this->getPathsForFiles('original');
    $this->fileFirst->save();

    // Trigger the file process.
    $access_token = $this->createAccessToken($this->userFirst);
    $results = $this->sendQuery("mutation { fileProcess(id: {$this->fileFirst->id}) { id status }}", $access_token->accessToken);

    $this->fileFirst->refresh();
    $this->assertEquals($this->fileFirst->status, File::STATUS_PASSED);

    $fileProcess = $results->json('data')['fileProcess'];
    $this->assertEquals($fileProcess['id'], $this->fileFirst->id);
    $this->assertEquals($fileProcess['status'], $this->fileFirst->status);

    // Asserting there are records in the system.
    $base_filter = [
      'file_id' => $this->fileFirst->id,
      'month' => 12,
      'year' => 2019
    ];

    $queries = [
      Income::class => [
        $base_filter + ['value' => 10000],
        $base_filter + ['value' => 1200],
        $base_filter + ['value' => 1000],
      ],

      Expense::class => [
        $base_filter + ['value' => -1255.06, 'date' => '2019-01-12'],
        $base_filter + ['value' => 3750, 'date' => '2019-01-12'],
        $base_filter + ['value' => 80, 'date' => '2019-01-12'],
      ],

      Limitation::class => [
        $base_filter + ['value_per_week' => 400, 'time_per_month' => 4],
        $base_filter + ['value_per_week' => 100, 'time_per_month' => 4],
        $base_filter + ['value_per_week' => 50, 'time_per_month' => 20],
      ],
    ];

    foreach ($queries as $object => $items_to_search) {

      foreach ($items_to_search as $item_to_search) {
        $query = null;

        foreach ($item_to_search as $field => $value) {
          $query = $object::where($field, $value);
        }

        $this->assertTrue($query->exists());
      }
    }
  }
}
