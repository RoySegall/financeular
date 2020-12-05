<?php

namespace Tests\Feature\Client;

use Illuminate\Testing\TestResponse;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

/**
 * Class TokenTest
 *
 * @package Tests\Feature\Client
 */
class TokenTest extends TestCase
{

  use MakesGraphQLRequests, FinancularTestUtilsTrait;

  /**
   * @var string
   */
  protected $query;

  /**
   * TokenTest constructor.
   *
   * @param string|null $name
   * @param array $data
   * @param string $dataName
   */
  public function __construct(?string $name = null, array $data = [], $dataName = '') {
    parent::__construct($name, $data, $dataName);
    $this->query = "{ me { id email } }";
  }

  /**
   * @param TestResponse $query
   */
  protected function verifyNotLoggedInError($token) {
    $errors = $this->postGraphQL(['query' => $this->query], ['Authorization' => $token])->json('errors');
    $this->assertEquals($errors[0]['message'], 'You are not logged in');
  }

  /**
   * A basic feature test example.
   */
  public function testValidToken() {
    $user = $this->createUser();

    $data = $this
      ->postGraphQL(['query' => $this->query], ['Authorization' => 'Bearer ' . $this->createAccessToken($user)->accessToken])
      ->json('data');

    $this->assertEquals($data, ['me' => ['id' => $user->id, 'email' => $user->email]]);
  }

  /**
   * Testing the me resolver for a non existing end point.
   */
  public function testTokenWhichIsNotExists() {
    $this->verifyNotLoggedInError('Bearer ' . $this->faker()->uuid);
  }

  /**
   * Testing the parsing of the token when not passing the Bearer in the header.
   */
  public function testTokenWithoutBearer() {
    $this->verifyNotLoggedInError($this->faker()->uuid);
  }

  /**
   * Testing the endpoint for a token which the expires has passed.
   */
  public function testTokenWhichIsPassed() {
    $token = $this->createAccessToken();

    // Set the expires at to something in the passed. I took a unix timestamp
    // and remove one digit.
    $token->token->expires_at = 160710785;
    $token->token->save();

    $this->verifyNotLoggedInError('Bearer ' . $token->accessToken);
  }

  /**
   * Testing the token a client which got deleted.
   */
  public function testTokenWhichTheClientIsDeleted() {
    $client = $this->createClient();
    $token = $this->createAccessToken(null, $client);

    // Delete the client.
    $client->delete();

    $this->verifyNotLoggedInError('Bearer ' . $token->accessToken);
  }

  /**
   * Testing the token for a user which got removed.
   */
  public function testTokenForUserWhichHasBeenRemoved() {
    $user = $this->createuser();
    $token = $this->createAccessToken($user);

    // Delete the user.
    $user->delete();

    $this->verifyNotLoggedInError('Bearer ' . $token->accessToken);
  }

}
