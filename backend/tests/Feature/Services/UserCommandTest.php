<?php

namespace Tests\Services;

use Illuminate\Validation\ValidationException;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

class UserCommandTest extends TestCase
{

  use FinancularTestUtilsTrait;

  /**
   * The client object.
   *
   * @var \Laravel\Passport\Client
   */
  protected $client;

  /**
   * The user service.
   *
   * @var \App\Services\UserService
   */
  protected $userService;

  /**
   * Setting up stuff for the test.
   */
  public function setUp(): void
  {
    parent::setUp();

    $this->client = $this->createClient();
    $this->userService = $this->app->get('App\Services\UserService');
  }

  /**
   * Testing the command for creating a user.
   */
  public function testCreateUserCommand() {
    $email = 'user@foo.com';
    $this->artisan('financeular:user-create')
      ->expectsQuestion('Enter the user email', $email)
      ->expectsQuestion('Enter the user password', 'password')
      ->expectsQuestion('Enter the name of the user', 'John Foo bar');

    // Testing the user exists.
    $user = $this->userService->getUserByEmail($email);
    $this->assertNotFalse($user);

    // Testing the login of the new user.
    $response = $this->loginViaRequest($email, 'password');

    $login = $response->json('data')['login'];

    $this->assertNotFalse($login['accessToken']);
    $this->assertNotFalse($login['expires']);

    $response = $this->sendQuery($this->queryMe, $login['accessToken']);

    $me = $response->json('data')['me'];

    $this->assertEquals($me['id'], $user->id);
  }

  /**
   * Testing the command when passing a bad email.
   */
  public function testCreateUserCommandWithBadEmail() {

    try {
      $this->artisan('financeular:user-create')
        ->expectsQuestion('Enter the user email', 'foo');
      $this->fail('A validation exception was not raised.');
    } catch (ValidationException $e) {
      $this->assertEquals($e->errors(), ['email' => [0 => 'The email must be a valid email address.']]);
    }
  }

  /**
   * Testing the creation of user with an email which already exists.
   */
  public function testCreateUserWithExistingEmail() {
    $user = $this->createuser();

    try {
      $this->artisan('financeular:user-create')
        ->expectsQuestion('Enter the user email', $user->email);
    } catch (\Exception $e) {
      $this->assertEquals($e->getMessage(), 'The email already exists');
    }
  }
}
