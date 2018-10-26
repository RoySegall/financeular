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
class UserDefaultTemplateTest extends TahiniBaseWebTestCase
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
     * Make sure we get the correct template.
     */
    public function testGetTemplate()
    {
        $this->assertEquals($this->user->getDefault(), null);

        $client = static::createClient();
        $client->request('GET', '/api/user-default/template', [], [], ['HTTP_' . \App\Services\TahiniAccessToken::ACCESS_TOKEN_HEADER_KEY => $this->accessToken->access_token,]);
        $this->assertEquals($client->getResponse()->getContent(), '{"error":"The user has no template"}');
        $this->assertEquals($this->getTahiniDoctrine()->getUserDefaultRepository()->findBy(['user' => $this->user]), []);
    }

    /**
     * Testing setting the template.
     */
    public function testSetTemplate()
    {
        $client = static::createClient();
        $client->request('POST', '/api/user-default/template', [], [], ['HTTP_' . \App\Services\TahiniAccessToken::ACCESS_TOKEN_HEADER_KEY => $this->accessToken->access_token, 'CONTENT_TYPE' => 'application/json'], '{"template": {"pizza": {"toppings": ["pineapple", "bacon"]}}}');
        $this->assertEquals($client->getResponse()->getContent(), '{"template":{"pizza":{"toppings":["pineapple","bacon"]}}}');

        $expected_template = ['pizza' => ['toppings' => ["pineapple", "bacon",]]];

        $default = $this->getTahiniDoctrine()->getUserDefaultRepository()->findBy(['user' => $this->user])[0];
        $this->entities[] = $default;

        $this->assertEquals($default->getTemplate(), $expected_template);
    }
}
