<?php

namespace Tests\Feature\Client;

use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\Feature\FinancularTestUtilsTrait;
use Tests\TestCase;

/**
 * Class UserResolverTest
 *
 * @package Tests\Feature\Client
 */
class UserResolverTest extends TestCase
{

  use MakesGraphQLRequests, FinancularTestUtilsTrait;

  /**
   * @var \App\Models\User
   */
  protected $firstUser;

  /**
   * @var \App\Models\User
   */
  protected $secondUser;

  /**
   * @var \App\Models\File
   */
  protected $file;

  /**
   * Setting the class and the assets.
   */
  protected function setUp(): void {
    parent::setUp();

    $this->firstUser = $this->createUser();
    $this->secondUser = $this->createUser();
    $this->file = $this->createFile($this->firstUser);
  }

  /**
   * Testing getting all the users from the users resolver.
   */
  public function testGetAllUsers() {
    $query = '{ users { data { name } } }';

    $this->graphQL($query)->assertJson([
      'data' => [
        'users' => [
          'data' => [
            0 => ['name' => $this->firstUser->name],
            1 => ['name' => $this->secondUser->name],
          ],
        ],
      ],
    ]);
  }

  public function testSingleUserRetrieve() {
    $users = [$this->firstUser, $this->secondUser];

    foreach ($users as $user) {
      $query = "{ user(id:{$user->id}) { id name } }";

      $this->graphQL($query)->assertJson([
        'data' => [
          'user' => [
            'id' => (string) $user->id,
            'name' => $user->name,
          ],
        ],
      ]);
    }
  }

  /**
   * Testing the file reference from the graphql resolvers.
   */
  public function testUserFileReference() {
    $query = "{ user(id:{$this->firstUser->id}) { id name files { id path } } }";

    $this->graphQL($query)->assertJson([
      'data' => [
        'user' => [
          'id' => (string) $this->firstUser->id,
          'name' => $this->firstUser->name,
          'files' => [
            0 => [
              'id' => (string) $this->file->id,
              'path' => $this->file->path,
            ],
          ],
        ],
      ],
    ]);
  }

}
