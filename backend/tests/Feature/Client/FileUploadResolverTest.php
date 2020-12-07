<?php

namespace Tests\Feature\Client;

use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

class FileUploadResolverTest extends TestCase
{

  use MakesGraphQLRequests, FinancularTestUtilsTrait;

  /**
   * Setting the class and the assets.
   */
  protected function setUp(): void {
    parent::setUp();
  }

  /**
   * Testing that a guest cannot upload a file.
   */
  public function testNotAuthUser() {
    $query = "mutation { fileUpload }";

    $errors = $this->graphQL($query)->json('errors');
    $this->assertEquals($errors[0]['message'], 'You are not allowed to upload a file.');
  }

  /**
   * Testing that a user cannot upload more than 10 files.
   */
  public function testLimitingUploadingFile() {
    $user = $this->createUser();
    $token = $this->createAccessToken($user);
    $query = "mutation { fileUpload }";


    // Testing when no files.
    $this->graphQueryWithToken($query, $token->accessToken)->assertJson(['data' => ['fileUpload' => 'a']]);

    // Testing when having 9 files.
    for ($i = 0; $i < 9; $i++) {
      $this->createFile($user);
    }
    $this->graphQueryWithToken($query, $token->accessToken)->assertJson(['data' => ['fileUpload' => 'a']]);

    // Testing when having 10 files.
    $this->createFile($user);
    $this->graphQueryWithToken($query, $token->accessToken)->assertJson(['data' => ['fileUpload' => 'a']]);

    // Testing when more than 10 files.
    $this->createFile($user);
    $errors = $this->graphQueryWithToken($query, $token->accessToken)->json('errors');
    $this->assertEquals($errors[0]['message'], 'You cannot upload more than 10 files.');

  }

}
