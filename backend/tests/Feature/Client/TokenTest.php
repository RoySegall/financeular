<?php

namespace Tests\Feature\Client;

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
   * TokenTest constructor.
   *
   * @param string|null $name
   * @param array $data
   * @param string $dataName
   */
  public function __construct(?string $name = null, array $data = [], $dataName = '')
  {
    parent::__construct($name, $data, $dataName);
  }

  /**
   * A basic feature test example.
   *
   * @return void
   */
  public function testExample()
  {
    $query = "{ me { id email } }";
    $user = $this->createUser();

    $data = $this
      ->postGraphQL(['query' => $query], ['Authorization' => 'Bearer ' . $this->createAccessToken($user)])
      ->json('data');

    $this->assertEquals($data, ['me' => ['id' => $user->id, 'email' => $user->email]]);
  }
}
