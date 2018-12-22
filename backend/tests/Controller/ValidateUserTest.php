<?php

namespace App\Tests\Controller;

use App\Entity\User;
use App\Tests\TahiniBaseWebTestCase;

/**
 * Testing the validation end point.
 *
 * @package App\Tests\Controller
 */
class ValidateUserTest extends TahiniBaseWebTestCase
{
    /**
     * @throws \Exception
     */
    public function testUserValidation()
    {
        $user = new User();

        $user->username = 'dummy username ' . time() . microtime();
        $user->setPassword('dummy username ' . time() . microtime());
        $user->setEmail('foo' . time() . microtime() . '@gmail.com');
        $user->setStatus(false);
        $user->roles = [];
        $user->type = 'user';

        $this->getTahiniUser()->createUser($user);

        $access_token = $this->getTahiniAccessToken()->createAccessToken($user);

        $client = static::createClient();
        $client->request('GET', '/api/user/validate?access_token=' . 1025);

        $contents = json_decode($client->getResponse()->getContent(), true);

        // Check with a not exiting access token.
        $this->assertEquals($contents, ['error' => 'whoops.. We cannot find a user by that access token']);

        // Validate the user.
        $client = static::createClient();
        $client->request('GET', '/api/user/validate?access_token=' . $access_token->access_token);

        $contents = json_decode($client->getResponse()->getContent(), true);

        $this->assertEquals($contents['message'], 'success');
        $this->assertEquals($contents['access_token']['id'], $access_token->getId());

        // Try to access the validation of the token again.
        $client = static::createClient();
        $client->request('GET', '/api/user/validate?access_token=' . $access_token->access_token);

        $contents = json_decode($client->getResponse()->getContent(), true);

        $this->assertEquals($contents, ['error' => 'whoops.. We cannot find a user by that access token']);
    }
}
