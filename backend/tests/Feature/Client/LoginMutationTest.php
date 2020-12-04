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

  protected function loginViaRequest($username, $password='password', $client_id=null, $client_secret=null) {
    $client_id = $client_id ? $client_id : $this->client->id;
    $client_secret = $client_secret ? $client_secret : $this->client->getPlainSecretAttribute();

    $query = "mutation { login(
      email: \"{$username}\"
      password: \"{$password}\"
      client_id: \"{$client_id}\"
      client_secret: \"{$client_secret}\"
    ) { accessToken expires }}";

    return $this->graphQL($query);
  }

  /**
   * Testing the login mutation.
   */
  public function testLoginMutation() {
    $data = $this->loginViaRequest($this->user->email)->json('data');

    $this->assertArrayHasKey('accessToken', $data['login']);
    $this->assertArrayHasKey('expires', $data['login']);
  }

  /**
   * Testing logging in with a wrong username.
   */
  public function testWrongUsername() {
    $data = $this->loginViaRequest('foo')->json('errors');
    $this->assertEquals('The password or user are incorrect', $data[0]['message']);
  }

  /**
   * Testing logging in with a wrong client ID.
   */
  public function testWithWrongClient() {
    $data = $this->loginViaRequest($this->user->email, 'password', 123)->json('errors');
    $this->assertEquals('The password or user are incorrect', $data[0]['message']);
  }

}
