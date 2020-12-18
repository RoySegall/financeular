<?php

namespace Tests\Feature\Services;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\PendingCommand;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

class CreateApplicationCommandTest extends TestCase
{
  use FinancularTestUtilsTrait;

  /**
   * Testing the happy flow for creating the app.
   */
  public function testCreateApplicationFromCommand() {
    $this
      ->artisan('financeular:create-app --client_id=12 --client_secret=secret')
      ->expectsOutput('The app has been created');

    // Now, create a user and connect with the app.
    $user = $this->createuser();
    $response = $this->loginViaRequest($user->email, 'password', 12, 'secret');

    // Validating the login.
    $login = $response->json('data')['login'];

    $this->assertNotFalse($login['accessToken']);
    $this->assertNotFalse($login['expires']);

    $response = $this->sendQuery($this->queryMe, $login['accessToken']);

    $me = $response->json('data')['me'];

    $this->assertEquals($me['id'], $user->id);
  }

  /**
   * Testing that we cannot continue when a docker application already exists.
   */
  public function testCreateDockerApplicationWhenAlreadyExists() {
    $client = $this->createClient();

    $validateFailure = function(PendingCommand $handler) {
      $handler->expectsOutput('A docker app already exists');
    };

    // Test with both of the id and secret.
    $validateFailure($this->artisan("financeular:create-app --client_id={$client->id} --client_secret={$client->getPlainSecretAttribute()}"));

    // Check the error when using a used ID.
    $validateFailure($this->artisan("financeular:create-app --client_id={$client->id} --client_secret=dummy"));

    // Test using a used ID.
    $validateFailure($this->artisan("financeular:create-app --client_id=0 --client_secret={$client->getPlainSecretAttribute()}"));
  }

  /**
   * Testing an failure is returned when a docker app already exists.
   */
  public function testDockerApplicationCreationWithExistingKeys() {
    $this
      ->artisan('financeular:create-app --client_id=12 --client_secret=secret')
      ->expectsOutput('The app has been created');

    $this
      ->artisan('financeular:create-app --client_id=120 --client_secret=s33ecret')
      ->expectsOutput('A docker app already exists');
  }
}
