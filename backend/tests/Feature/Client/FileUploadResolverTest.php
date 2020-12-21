<?php

namespace Tests\Feature\Client;

use App\Models\File;
use GuzzleHttp\Psr7\MimeType;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;


class FileUploadResolverTest extends TestCase
{

  use MakesGraphQLRequests, FinancularTestUtilsTrait;

  /**
   * @var \App\Models\User
   */
  protected $user;

  /**
   * @var \Laravel\Passport\PersonalAccessTokenResult
   */
  protected $accessToken;

  /**
   * Setting the class and the assets.
   */
  protected function setUp(): void {
    parent::setUp();

    $this->user = $this->createUser();
    $this->accessToken = $this->createAccessToken($this->user);
  }

  /**
   * Returning a file which is supported for the current tests.
   *
   * If needed in other place then we'll move it.
   *
   * @return \Illuminate\Http\Testing\File
   */
  protected function getSupportedFile() {
    return $this->createFileToUpload('good_file.xlsx', 500, MimeType::fromExtension('xlsx'));
  }

  /**
   * Testing that a guest cannot upload a file.
   */
  public function testNotAuthUser() {
    $this->assertErrorFromResponse($this->uploadFile(), 'You are not allowed to upload a file.');
  }

  /**
   * Testing that a user cannot upload more than 10 files.
   */
  public function testLimitingUploadingFile() {
    $access_token = $this->accessToken->accessToken;
    // Testing when having 9 files.
    for ($i = 0; $i < 9; $i++) {
      $this->createFile($this->user);
    }

    $this->assertFileUploadResponse($this->uploadFile($this->getSupportedFile(), $access_token));

    // Testing when more than 10 files.
    $this->createFile($this->user);
    $this->assertErrorFromResponse($this->uploadFile($this->getSupportedFile(), $access_token), 'You cannot upload more than 10 files.');
  }

  /**
   * Testing the upload of the file.
   */
  public function testUnsupportedFileType() {
    $file = $this->createFileToUpload('image.jpg', 500, MimeType::fromExtension('.jpg'));

    $this->assertErrorFromResponse($this->uploadFile($file, $this->accessToken->accessToken), 'The uploaded file is not supported');
  }

  /**
   * Testing the upload of the file.
   */
  public function testingSupportedFileTypeAndCreation() {
    $this->assertEquals(File::all()->count(), 0);
    $this->assertFileUploadResponse($this->uploadFile($this->getSupportedFile(), $this->accessToken->accessToken));
    $this->assertEquals(File::all()->count(), 1);
  }

  /**
   * Testing that a file with a unique name is saved.
   */
  public function testUniqueFileIsSaved() {
    // Creating two files.
    $this->assertFileUploadResponse($this->uploadFile($this->getSupportedFile(), $this->accessToken->accessToken));
    $this->assertFileUploadResponse($this->uploadFile($this->getSupportedFile(), $this->accessToken->accessToken));

    [$first_file, $second_file] = File::all();

    $this->assertNotEquals($first_file->path, $second_file->path);
  }
}
