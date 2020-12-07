<?php

namespace Tests\Feature;

use App\Models\Expense;
use App\Models\File;
use App\Models\Income;
use App\Models\Limitation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\Client;
use Laravel\Passport\PersonalAccessClient;
use Laravel\Passport\PersonalAccessTokenResult;
use Illuminate\Http\Testing\File as TestingFile;


trait FinancularTestUtilsTrait
{

  use WithFaker, RefreshDatabase;

  protected $preventFileUpload = null;

  /**
   * Creating a user.
   *
   * @return User
   */
  public function createUser() {

    $user = new User();
    $user->name = $this->faker()->name;
    $user->email = $this->faker()->unique()->email;
    $user->password = Hash::make('password');
    $user->save();

    return $user;
  }

  /**
   * Creating a file.
   *
   * @param $user
   *   The user which owns the file. Optional.
   *
   * @return File
   */
  public function createFile($user = null) {

    if (!$user) {
      $user = $this->createUser();
    }

    $file = new File();
    $file->name = $this->faker()->name;
    $file->path = $this->faker()->name;
    $file->user()->associate($user);
    $file->save();

    return $file;
  }

  /**
   * Creating a limitation.
   *
   * @param $file
   *   The file which the limitation belongs to. Optional.
   *
   * @return Limitation
   *   The model we created.
   */
  public function createLimitation($file = null) {
    if (!$file) {
      $file = $this->createFile();
    }

    $limitation = new Limitation();
    $limitation->file_id = $file->id;
    $limitation->month = $this->faker()->numberBetween(1, 12);
    $limitation->year = $this->faker()->numberBetween(2019, 2020);
    $limitation->value_per_week = $this->faker()->numberBetween(0, 500);
    $limitation->description = $this->faker()->sentence;
    $limitation->time_per_month = $this->faker()->numberBetween(0, 10);
    $limitation->title = $this->faker()->sentence;
    $limitation->save();

    return $limitation;
  }

  /**
   * Creating an income.
   *
   * @param null $file
   *   The file which the limitation belongs to. Optional.
   *
   * @return Income
   */
  public function createIncome($file = null) {
    if (!$file) {
      $file = $this->createFile();
    }

    $income = new Income();
    $income->file_id = $file->id;
    $income->month = $this->faker()->numberBetween(1, 12);
    $income->year = $this->faker()->numberBetween(2019, 2020);
    $income->title = $this->faker()->sentence;
    $income->value = $this->faker()->numberBetween(0, 500);

    $income->save();

    return $income;
  }

  /**
   * Create an expense for a file.
   *
   * @param null $file
   *   The file which the limitation belongs to. Optional.
   *
   * @return Expense
   */
  public function createExpense($file = null) {
    if (!$file) {
      $file = $this->createFile();
    }

    $expense = new Expense();
    $expense->file_id = $file->id;
    $expense->month = $this->faker()->numberBetween(1, 12);
    $expense->year = $this->faker()->numberBetween(2019, 2020);
    $expense->title = $this->faker()->sentence;
    $expense->value = $this->faker()->numberBetween(0, 500);
    $expense->date = $this->faker()->date();
    $expense->save();

    return $expense;
  }

  /**
   * @return Client
   */
  public function createClient() {
    $client = new Client();
    $client->name = $this->faker()->name;
    $client->secret = $this->faker()->uuid;
    $client->redirect = 'http://google.com';
    $client->personal_access_client = true;
    $client->password_client = false;
    $client->revoked = false;
    $client->save();

    $personal = new PersonalAccessClient();
    $personal->client_id = $client->id;
    $personal->save();

    return $client;
  }

  /**
   * Creating an access token for a user.
   *
   * @param null $user
   *   The user object. Optional. If null is passed then a new user will be
   *   created.
   * @param null $client
   *   The client which the token will be associated with. Optional. If null is
   *   passed then a new client will be created.
   *
   * @return PersonalAccessTokenResult
   *   The access token it self.
   */
  protected function createAccessToken($user = null, $client = null): PersonalAccessTokenResult {

    if (!$client) {
      $client = $this->createClient();
    }

    if (!$user) {
      $user = $this->createUser();
    }

    return $user->createToken($client->name);
  }

  /**
   * Sending a graphql query with an access token.
   *
   * @param $query
   *   The query to send.
   * @param $token
   *   The token of the user.s
   * @return mixed
   */
  protected function graphQueryWithToken($query, $token) {
    return $this->postGraphQL(['query' => $query], ['Authorization' => 'Bearer ' . $token]);
  }

  /**
   * Creating a file to upload.
   *
   * @param $filename
   *   The file name.
   * @param int $kilobyte
   *   The size of file.
   * @param null $mime_type
   *   The mime type.
   *
   * @return TestingFile
   */
  protected function createFileToUpload($filename, $kilobyte = 500, $mime_type = null) {
    return TestingFile::fake()->create($filename, $kilobyte, $mime_type);
  }

  /**
   * Uploading file.
   *
   * @param null $file
   *   The file to upload. If nothing will pass then a dummy file will be
   *   created.
   * @param null $access_token
   *   The access token of a user. Optional.
   *
   * @return \Illuminate\Testing\TestResponse
   */
  protected function uploadFile($file = null, $access_token = null) {

    if (!$file) {
      $file = $this->createFileToUpload('image.jpg');
    }

    $headers = [];

    if ($access_token) {
      $headers['Authorization'] = 'Bearer ' . $this->accessToken->accessToken;
    }

    return $this->multipartGraphQL(
      [
        'operations' => /** @lang JSON */
          '
            {
                "query": "mutation($file: Upload!) { fileUpload(file: $file) { id name path } }",
                "variables": {
                    "file": null
                }
            }
        ',
        'map' => /** @lang JSON */
          '
            {
                "0": ["variables.file"]
            }
        ',
      ],
      ['0' => $file],
      $headers
    );
  }

  /**
   * Assert the file upload for a given file.
   *
   * @param $response
   *   The response from the mutation.
   */
  protected function assertFileUploadResponse($response) {
    $data = $response->json('data');

    $this->assertArrayHasKey('fileUpload', $data);
    $this->assertNotEmpty($data['fileUpload']['id']);
    $this->assertNotEmpty($data['fileUpload']['name']);
    $this->assertNotEmpty($data['fileUpload']['path']);
  }

  /**
   * Asserting the error from a response.
   *
   * @param $response
   *   The response from the query/mutation.
   * @param $message
   *   The message to assert.
   */
  protected function assertErrorFromResponse($response, $message) {
    $errors = $response->json('errors');
    $this->assertEquals($errors[0]['message'], $message);
  }

}
