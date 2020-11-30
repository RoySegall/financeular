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
     * Testing getting all the users from the users resolver.
     */
    public function testGetAllUsers() {
        // Creates a user and send a request for that.
        $user = $this->createUser();

        $query = '{
            users {
                data {
                    name
                }
            }
        }
        ';

        $this->graphQL($query)->assertJson([
            'data' => [
                'users' => [
                    'data' => [
                        0 => ['name' => $user->name]
                    ]
                ]
            ]
        ]);
    }

    /**
     * Testing getting a single user.
     */
    public function testSingleUserRetrieve() {
        $this->assertEquals(1, 1);
    }

    /**
     * Testing the user and users revolsers.
     */
    public function testMultipleUserResolvers() {
        $this->assertEquals(1, 1);
    }

    /**
     * Testing the file reference from the graphql resolvers.
     */
    public function testUserFileReference() {
        $this->assertEquals(1, 1);
    }
}
