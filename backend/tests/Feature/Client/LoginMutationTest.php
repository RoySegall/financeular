<?php

namespace Tests\Feature\Client;

use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

/**
 * Testing the login mutation.
 *
 * @package Tests\Feature\Client
 */
class LoginMutationTest extends TestCase
{

  use MakesGraphQLRequests, FinancularTestUtilsTrait;

  /**
   * @var \App\Models\User
   */
  protected $user;

  /**
   * @var \Laravel\Passport\Client
   */
  protected $client;

  /**
   * Setting up the class.
   */
  protected function setUp(): void {
    parent::setUp();

    $this->user = $this->createUser();
    $this->client = $this->createClient();
  }

  /**
   * Testing the login mutation.
   */
  public function testLoginMutation() {
    $query = "mutation { login(
      email: \"{$this->user->email}\"
      password: \"password\"
      client_id: \"{$this->client->id}\"
      client_secret: \"{$this->client->getPlainSecretAttribute()}\"
    )}";

//    $data = $this->graphQL($query)->json('data');
    $data = $this->graphQL($query)->json();

    \Kint::dump($data);

    $this->assertArrayHasKey('token', $data);
    $this->assertArrayHasKey('refresh_token', $data);
    $this->assertArrayHasKey('expires', $data);
  }

}
