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
        $client->request('GET', '/api/employee', [], [], $this->createHeaderWithAccessToken());

        $items_first = json_decode($client->getResponse()->getContent());

        $client = static::createClient();
        $client->request('GET', '/api/employee?page=1', [], [], $this->createHeaderWithAccessToken());
        $items_second = json_decode($client->getResponse()->getContent());

        // Count the items.
        $this->assertEquals(count($items_first->data), 25);
        $this->assertEquals(count($items_second->data), 5);
    }

    /**
     * Testing we can add items.
     */
    public function testAdd() {
        // Sending a request without a title.
        $client = static::createClient();
        $client->request('POST', '/api/employee', [], [], $this->createHeaderWithAccessToken(), json_encode(['foo' => 'bar']));
        $this->assertEquals($client->getResponse()->getContent(), '{"error":"You need to provide a title"}');

        // Sending a proper request.
        $title = 'dummy employee ' . time();
        $client = static::createClient();
        $client->request('POST', '/api/employee', [], [], $this->createHeaderWithAccessToken(), json_encode(['title' => $title]));

        $result = json_decode($client->getResponse()->getContent());
        $this->assertEquals($result->title, $title);

        // Trying to crate another company.
        $client = static::createClient();
        $client->request('POST', '/api/employee', [], [], $this->createHeaderWithAccessToken(), json_encode(['title' => $title]));
        $this->assertEquals($client->getResponse()->getContent(), '{"message":"The company ' . $title . ' already exists"}');
    }
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
