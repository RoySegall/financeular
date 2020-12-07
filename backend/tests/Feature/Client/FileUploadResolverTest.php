<?php

namespace Tests\Feature\Client;

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
   * Testing that a guest cannot upload a file.
   */
  public function testNotAuthUser() {
    $errors = $this->uploadFile()->json('errors');
    $this->assertEquals($errors[0]['message'], 'You are not allowed to upload a file.');
  }

  /**
   * Testing that a user cannot upload more than 10 files.
   */
  public function testLimitingUploadingFile() {
    $query = "mutation { fileUpload }";

    // Testing when no files.
    $this->uploadFile(null, $this->accessToken->accessToken)->assertJson(['data' => ['fileUpload' => 'a']]);

    // Testing when having 9 files.
    for ($i = 0; $i < 9; $i++) {
      $this->createFile($this->user);
    }

    $this->uploadFile(null, $this->accessToken->accessToken)->assertJson(['data' => ['fileUpload' => 'a']]);

    // Testing when having 10 files.
    $this->createFile($this->user);
    $this->uploadFile(null, $this->accessToken->accessToken)->assertJson(['data' => ['fileUpload' => 'a']]);

    // Testing when more than 10 files.
    $this->createFile($this->user);
    $errors = $this->uploadFile(null, $this->accessToken->accessToken)->json('errors');
    $this->assertEquals($errors[0]['message'], 'You cannot upload more than 10 files.');
  }

  /**
   * Testing the upload of the file.
   */
  public function  testUploadFileByUser() {
    $this->uploadFile(null, $this->accessToken->accessToken)->assertJson(['data' => ['fileUpload' => 'a']]);
  }
}
