<?php

namespace Tests\Feature\Client;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

class TokenTest extends TestCase
{

  use MakesGraphQLRequests, FinancularTestUtilsTrait;

  /**
   * A basic feature test example.
   *
   * @return void
   */
  public function testExample()
  {
    $query = "{ me }";

    $response = $this->postGraphQL(['query' => $query], ['Authorization' => 'foo']);
  }
}
