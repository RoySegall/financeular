<?php

namespace Tests\Feature\Client;

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
    $this->fail();
  }

  /**
   * Test Access for file: file which belong to the user and one which not.
   */
  public function testAccessForFile() {
    $this->fail();
  }

  /**
   * Test processing an invalid file.
   */
  public function testInvalidFile() {
    $this->fail();
  }

  /**
   * Testing the happy flow - processing a valid file which belong to the user.
   */
  public function testValidFile() {
    $this->fail();
  }
}
