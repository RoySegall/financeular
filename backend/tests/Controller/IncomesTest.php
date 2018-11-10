<?php

namespace App\Tests\Controller;

use App\Entity\AccessToken;
use App\Entity\Employee;
use App\Entity\Income;
use App\Entity\User;
use App\Tests\TahiniBaseWebTestCase;

/**
 * Testing login controller.
 *
 * @package App\Tests\Controller
 */
class IncomesTest extends TahiniBaseWebTestCase
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
    protected function createIncomes($amount = 30, $user = null)
    {
        $manager = $this->getDoctrine()->getManager();

        $incomes = [];
        for ($i = 0; $i < $amount; $i++) {
            $income = new Income();
            $income->setValue(rand(100, 500));
            $income->setStartingDate(time());
            $income->setCurrent($i === 0);

            if ($user) {
                $income->setUser($user);
            } else {
                $income->setUser($this->user);
            }

            $manager->persist($income);
            $manager->flush();

            $incomes[] = $income;
        }

        $this->entities += $incomes;

        return $incomes;
    }

    /**
     * Testing getting all the entities.
     */
    public function testGetAll()
    {
        $incomes = $this->createIncomes(5);

        $client = static::createClient();
        $client->request('GET', '/api/incomes', [], [], $this->createHeaderWithAccessToken());

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
        $incomes = $this->createIncomes(1);
        $income = $incomes[0];

        $client = static::createClient();
        $client->request('GET', '/api/incomes/' . $income->getId(), [], [], $this->createHeaderWithAccessToken());
        $results = json_decode($client->getResponse()->getContent(), true);

        $this->assertEquals($income->getId(), $results[0]['id']);
        $this->assertEquals($income->getValue(), $results[0]['value']);
    }

    /**
     * Testing adding an income.
     */
    public function testAdd()
    {
        $employee = new Employee();
        $employee->setTitle('dummy');

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($employee);
        $manager->flush();

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
                    'starting_date' => ['This value should not be blank.'],
                ],
            ],
            [
                'data' => '{"value": 120}',
                'expected' => [
                    'value' => ['This value should be of type float.'],
                    'starting_date' => ['This value should not be blank.'],
                ],
            ],
            [
                'data' => '{"value": 12.0}',
                'expected' => [
                    'starting_date' => ['This value should not be blank.'],
                ],
            ],
            [
                'data' => '{"value": 2000.0, "starting_date": ' . time() . '}',
                'expected' => function ($value) {
                    $entity = $this->getTahiniDoctrine()->getIncomeRepository()->find($value['id']);

                    if ($entity) {
                        $this->entities[] = $entity;
                    }

                    $this->assertTrue($this->getTahiniDoctrine()->getIncomeRepository()->find($entity) != null);
                },
            ],
            [
                'data' => '{
                    "value": 2000.0,
                    "starting_date": ' . time() . ',
                    "work_place": ' . time() . '
                }',
                'expected' => ['work_place' => ['it seems you referenced employee is not correct']],
            ],
            [
                'data' => '{
                    "value": 2000.0,
                    "starting_date": ' . time() . ',
                    "work_place": ' . $employee->getId() . '
                }',
                'expected' => function ($value) use ($employee) {
                    $this->assertEquals($value['workPlace']['id'], $employee->getId());
                },
            ],
        ];

        foreach ($operations as $operation) {
            $client = static::createClient();
            $client->request('POST', '/api/incomes', [], [], $this->createHeaderWithAccessToken(), $operation['data']);

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
        $incomes = $this->createIncomes(1);
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
        $incomes = $this->createIncomes(1);
        $income = $incomes[0];

        $content = '{"value": 50}';
        $client = static::createClient();
        $client->request(
            'PATCH',
            '/api/incomes/' . $income->getId(),
            [],
            [],
            $this->createHeaderWithAccessToken(),
            $content
        );

        $loaded_income = $this->getTahiniDoctrine()->getIncomeRepository()->find($income->getId());
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

        $default_user_incomes = $this->createIncomes(1);
        $second_user_incomes = $this->createIncomes(1, $second_user);

        // try to access the incomes of another user.
        $client = static::createClient();
        $client->request(
            'GET',
            '/api/incomes',
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
            '/api/incomes',
            [],
            [],
            [
                'HTTP_' . \App\Services\TahiniAccessToken::ACCESS_TOKEN_HEADER_KEY => $second_access_token->access_token,
            ]
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
