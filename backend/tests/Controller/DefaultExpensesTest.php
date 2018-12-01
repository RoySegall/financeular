<?php

namespace App\Tests\Controller;

use App\Entity\AccessToken;
use App\Entity\DefaultExpenses;
use App\Entity\Employee;
use App\Entity\Income;
use App\Entity\User;
use App\Tests\TahiniBaseWebTestCase;

/**
 * Testing login controller.
 *
 * @package App\Tests\Controller
 */
class DefaultExpensesTest extends TahiniBaseWebTestCase
{

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
     * Creating incomes for testing.
     *
     * @param int $amount
     *  The amount of employees you desire. Default to 30.
     *
     * @return Income[]
     */
    protected function createDefaultExpenses($amount = 30, $user = null)
    {
        $manager = $this->getDoctrine()->getManager();

        $expenses = [];
        for ($i = 0; $i < $amount; $i++) {
            $expense = new DefaultExpenses();
            $expense->setValue(rand(100, 500));
            $expense->setTitle('expense ' . time() . microtime());


            if ($user) {
                $expense->setUser($user);
            } else {
                $expense->setUser($this->user);
            }

            $manager->persist($expense);
            $manager->flush();

            $expenses[] = $expense;
        }

        $this->entities += $expenses;

        return $expenses;
    }

    /**
     * Testing getting all the entities.
     */
    public function testGetAll()
    {
        $incomes = $this->createDefaultExpenses(5);

        $client = static::createClient();
        $client->request('GET', '/api/default_expenses', [], [], $this->createHeaderWithAccessToken());

        $results = json_decode($client->getResponse()->getContent(), true);

        $this->assertCount(5, $results);

        foreach ($incomes as $key => $income) {
            $this->assertEquals($income->getId(), $results[$key]['id']);
            $this->assertEquals($income->getValue(), $results[$key]['value']);
        }
    }

    /**
     * Testing getting a single entity.
     */
    public function testGetSingle()
    {
        $incomes = $this->createDefaultExpenses(1);
        $income = $incomes[0];

        $client = static::createClient();
        $client->request('GET', '/api/default_expenses/' . $income->getId(), [], [], $this->createHeaderWithAccessToken());
        $results = json_decode($client->getResponse()->getContent(), true);

        $this->assertEquals($income->getId(), $results[0]['id']);
        $this->assertEquals($income->getValue(), $results[0]['value']);
    }

    /**
     * Testing adding an income.
     */
    public function testAdd()
    {
        $operations = [
            [
                'data' => '{}',
                'expected' => [
                    'error' => 'The payload seems to be empty',
                ],
            ],
            [
                'data' => '{"foo": "bar"}',
                'expected' => [
                    'value' => ['This value should not be blank.'],
                    'title' => ['This value should not be blank.'],
                ],
            ],
            [
                'data' => '{"title": "testing stuff"}',
                'expected' => [
                    'value' => ['This value should not be blank.'],
                ],
            ],
            [
                'data' => '{"title": "testing stuff", "value": "foo"}',
                'expected' => [
                    'value' => ['This value should be of type float.'],
                ],
            ],
            [
                'data' => '{"title": "testing stuff", "value": 500.5}',
                'expected' => function ($value) {
                    $entity = $this->getTahiniDoctrine()->getDefaultExpensesRepository()->find($value['id']);

                    if ($entity) {
                        $this->entities[] = $entity;
                    }

                    $loaded_entity = $this->getTahiniDoctrine()->getDefaultExpensesRepository()->find($entity);
                    $this->assertTrue($loaded_entity != null);
                },
            ],
        ];

        foreach ($operations as $operation) {
            $client = static::createClient();
            $client->request(
                'POST',
                '/api/default_expenses',
                [],
                [],
                $this->createHeaderWithAccessToken(),
                $operation['data']
            );

            $contents = json_decode($client->getResponse()->getContent(), true);

            if (is_callable($operation['expected'])) {
                $operation['expected']($contents);
            } else {
                $this->assertEquals($contents, $operation['expected']);
            }
        }
    }

    /**
     * Testing deleting an income.
     */
    public function testDelete()
    {
        $incomes = $this->createDefaultExpenses(1);
        $income = $incomes[0];

        $client = static::createClient();
        $client->request('DELETE', '/api/incomes/' . $income->getId(), [], [], $this->createHeaderWithAccessToken());

        $this->assertEmpty($this->getTahiniDoctrine()->getIncomeRepository()->find($income->getId()));
    }

    /**
     * Testing updating an income.
     */
    public function testUpdate()
    {
        $expenses = $this->createDefaultExpenses(1);
        $expense = $expenses[0];

        $content = '{"value": 50}';
        $client = static::createClient();
        $client->request(
            'PATCH',
            '/api/default_expenses/' . $expense->getId(),
            [],
            [],
            $this->createHeaderWithAccessToken(),
            $content
        );

        $loaded_income = $this->getTahiniDoctrine()->getDefaultExpensesRepository()->find($expense->getId());
        $this->assertEquals($loaded_income->getValue(), 50);
    }

    /**
     * Testing access for incomes of other users.
     */
    public function testIncomeAccess()
    {
        // Create incomes for each user.
        $second_user = $this->createUser(false);
        $second_access_token = $this->getTahiniAccessToken()->getAccessToken($second_user);

        $default_user_incomes = $this->createDefaultExpenses(1);
        $second_user_incomes = $this->createDefaultExpenses(1, $second_user);

        // try to access the incomes of another user.
        $client = static::createClient();
        $client->request(
            'GET',
            '/api/default_expenses',
            [],
            [],
            $this->createHeaderWithAccessToken()
        );
        $this->assertEquals(
            $default_user_incomes[0]->getId(),
            json_decode($client->getResponse()->getContent(), true)[0]['id']
        );

        // Access with the second user.
        $client = static::createClient();
        $client->request(
            'GET',
            '/api/default_expenses',
            [],
            [],
            ['HTTP_' . \App\Services\TahiniAccessToken::ACCESS_TOKEN_HEADER_KEY => $second_access_token->access_token]
        );

        $this->assertEquals(
            $second_user_incomes[0]->getId(),
            json_decode($client->getResponse()->getContent(), true)[0]['id']
        );

        $this->assertNotEquals(
            $default_user_incomes[0]->getId(),
            json_decode($client->getResponse()->getContent(), true)[0]['id']
        );
    }
}
