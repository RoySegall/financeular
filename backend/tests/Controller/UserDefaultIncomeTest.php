<?php

namespace App\Tests\Controller;

use App\Entity\AccessToken;
use App\Entity\User;
use App\Tests\TahiniBaseWebTestCase;

/**
 * Testing login controller.
 *
 * @package App\Tests\Controller
 */
class UserDefaultIncomeTest extends TahiniBaseWebTestCase
{
    /**
     * @var User
     */
    protected $user;

    /**
     * @var AccessToken
     */
    protected $accessToken;

    /**
     * {@inheritdoc}
     */
    public function setUp()
    {
        parent::setUp();

        $this->user = $this->createUser(false);
        $this->accessToken = $this->getTahiniAccessToken()->getAccessToken($this->user);
    }

    /**
     * Make sure we get the correct income.
     */
    public function testGetIncome()
    {
        $this->assertEquals($this->user->getDefault(), null);

        $client = static::createClient();
        $client->request('GET', '/api/user-default/income', [], [], ['HTTP_' . \App\Services\TahiniAccessToken::ACCESS_TOKEN_HEADER_KEY => $this->accessToken->access_token]);
        $this->assertEquals($client->getResponse()->getContent(), '{"error":"The user has no income"}');
        $this->assertEquals($this->getTahiniDoctrine()->getUserDefaultRepository()->findBy(['user' => $this->user]), []);
    }

    /**
     * Testing setting the income.
     */
    public function testSetIncome()
    {
        $client = static::createClient();
        $client->request('POST', '/api/user-default/income', [], [], ['HTTP_' . \App\Services\TahiniAccessToken::ACCESS_TOKEN_HEADER_KEY => $this->accessToken->access_token, 'CONTENT_TYPE' => 'application/json'], '{"income": "300"}');
        $this->assertEquals($client->getResponse()->getContent(), '{"income":"300"}');

        $this->assertEquals($this->getTahiniDoctrine()->getUserDefaultRepository()->findBy(['user' => $this->user])[0]->getIncome(), 300);
    }
}
