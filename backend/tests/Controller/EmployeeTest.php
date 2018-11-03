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
    public function setUp()
    {
        parent::setUp();

        $this->user = $this->createUser();
        $this->accessToken = $this->getTahiniAccessToken()->getAccessToken($this->user);
    }

    /**
     * Testing we get all the items with the paging.
     */
    public function testGetAll()
    {
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
    public function testAdd()
    {
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

    /**
     * Testing we can search items.
     */
    public function testSearch() {
        // Create two employees.
        $this->createEmployees(2);

        // Sending a request with a short search term.
        $client = static::createClient();
        $client->request('GET', '/api/employee/search/fo', [], [], $this->createHeaderWithAccessToken());
        $this->assertEquals($client->getResponse()->getContent(), '{"error":"The search term need to be bigger more than 2 characters"}');

        // Sending a request with a good term and make sure it appears.
        $options = [
            ['search' => 'dummy title', 'should' => ['dummy title 0', 'dummy title 1']],
            ['search' => 'dummy title 0', 'should' => ['dummy title 0'], 'should_not' => ['dummy title 1']],
            ['search' => 'dummy title 1', 'should' => ['dummy title 1'], 'should_not' => ['dummy title 0']],
        ];

        foreach ($options as $option) {
            $client->request('GET', '/api/employee/search/' . $option['search'], [], [], $this->createHeaderWithAccessToken());
            $results = $client->getResponse()->getContent();

            // Testing what we need to find.
            foreach ($option['should'] as $should) {
                if (strpos($results, $should) === false) {
                    $this->fail('The title ' . $should . ' was not found but it should');
                }
            }

            if (!empty($option['should_not'])) {
                // Testing what we don't need to find.
                foreach ($option['should_not'] as $should) {
                    if (strpos($results, $should) !== false) {
                        $this->fail('The title ' . $should . ' need was fount when it should not');
                    }
                }
            }
        }
    }

    /**
     * Creating employees for testing.
     *
     * @param int $amount
     *  The amount of employees you desire. Default to 30.
     */
    protected function createEmployees($amount = 30)
    {
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
