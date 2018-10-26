<?php

namespace App\Tests\Controller;

use App\Controller\Employee\Employee;
use App\Entity\AccessToken;
use App\Entity\User;
use App\Tests\TahiniBaseWebTestCase;

/**
 * Testing login controller.
 *
 * @package App\Tests\Controller
 */
class EmployeeTest extends TahiniBaseWebTestCase
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
    public function setUp() {
        parent::setUp();

        $this->user = $this->createUser(false);
        $this->accessToken = $this->getTahiniAccessToken()->getAccessToken($this->user);
    }

    /**
     * Testing we get all the items with the paging.
     */
    public function testGetAll() {
        // Create items.
        $this->createEmployees(30);

        // Get all the items.
        $client = static::createClient();
        $client->request('GET', '/api/employee', [], [], ['HTTP_' . \App\Services\TahiniAccessToken::ACCESS_TOKEN_HEADER_KEY => $this->accessToken->access_token]);

        $items_first = json_decode($client->getResponse()->getContent());

        $client = static::createClient();
        $client->request('GET', '/api/employee?page=1', [], [], ['HTTP_' . \App\Services\TahiniAccessToken::ACCESS_TOKEN_HEADER_KEY => $this->accessToken->access_token]);
        $items_second = json_decode($client->getResponse()->getContent());

        // Count the items.
        $this->assertEquals(count($items_first->data), 25);
        $this->assertEquals(count($items_second->data), 5);
    }

//    /**
//     * Testing we can add items.
//     */
//    public function testAdd() {
//        // Sending a request without a title.
//
//        // Sending a proper request.
//    }
//
//    /**
//     * Testing we can search items.
//     */
//    public function testSearch() {
//        // Sending a request with a short search term.
//
//        // Sending a request with a good term and make sure it appears.
//    }
//
    /**
     * Creating employees for testing.
     *
     * @param int $amount
     *  The amount of employees you desire. Default to 30.
     */
    protected function createEmployees($amount = 30) {
        $manager = $this->getDoctrine()->getManager();

        for ($i = 0; $i < $amount; $i++) {
            $employee = new \App\Entity\Employee();
            $employee->setTitle('dummy title ' . $i);

            $manager->persist($employee);
            $manager->flush();

            $this->entities[] = $employee;
        }
    }
}
