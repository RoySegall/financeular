<?php

namespace App\Tests\Controller;

use App\Entity\AccessToken;
use App\Entity\Employee;
use App\Entity\Income;
use App\Entity\RecurringPayment;
use App\Entity\User;
use App\Tests\TahiniBaseWebTestCase;

/**
 * Testing login controller.
 *
 * @package App\Tests\Controller
 */
class RecurringPaymentsTest extends TahiniBaseWebTestCase
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
     * Creating recurring payments for testing.
     *
     * @param int $amount
     *  The amount of recurring payments you desire. Default to 30.
     *
     * @return RecurringPayment[]
     */
    protected function createRecurringPayments($amount = 30, $user = null)
    {
        $manager = $this->getDoctrine()->getManager();

        $recurring_payments = [];
        for ($i = 0; $i < $amount; $i++) {
            $recurring_payment = new RecurringPayment();
            $recurring_payment->setValue(rand(100, 500));
            $recurring_payment->setTitle('foo data ' . time() . microtime());
            $recurring_payment->setAmountOfRecurring(rand(3, 10));
            $recurring_payment->setValidFrom(time() - rand(86400, 86400 * 5));

            if ($user) {
                $recurring_payment->setUser($user);
            } else {
                $recurring_payment->setUser($this->user);
            }

            $manager->persist($recurring_payment);
            $manager->flush();

            $recurring_payments[] = $recurring_payment;
        }

        $this->entities += $recurring_payments;

        return $recurring_payments;
    }

    /**
     * Testing getting all the entities.
     */
    public function testGetAll()
    {
        $incomes = $this->createRecurringPayments(5);

        $client = static::createClient();
        $client->request('GET', '/api/recurring_payments', [], [], $this->createHeaderWithAccessToken());

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
        $incomes = $this->createRecurringPayments(1);
        $income = $incomes[0];

        $client = static::createClient();
        $client->request(
            'GET',
            '/api/recurring_payments/' . $income->getId(),
            [],
            [],
            $this->createHeaderWithAccessToken()
        );
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
//            [
//                'data' => '{}',
//                'expected' => [
//                    'error' => 'The payload seems to be empty',
//                ],
//            ],
//            [
//                'data' => '{"foo": "bar"}',
//                'expected' => [
//                    'title' => ['This value should not be blank.'],
//                    'value' => ['This value should not be blank.'],
//                    'amount_of_recurring' => ['This value should not be blank.'],
//                    'valid_from' => ['This value should not be blank.'],
//                ],
//            ],
//            [
//                'data' => '{"foo": "bar"}',
//                'expected' => [
//                    'title' => ['This value should not be blank.'],
//                    'value' => ['This value should not be blank.'],
//                    'amount_of_recurring' => ['This value should not be blank.'],
//                    'valid_from' => ['This value should not be blank.'],
//                ],
//            ],
//            [
//                'data' => '{"title": "bar"}',
//                'expected' => [
//                    'value' => ['This value should not be blank.'],
//                    'amount_of_recurring' => ['This value should not be blank.'],
//                    'valid_from' => ['This value should not be blank.'],
//                ],
//            ],
//            [
//                'data' => '{"title": "bar", "value": "foo"}',
//                'expected' => [
//                    'value' => ['This value should be of type float.'],
//                    'amount_of_recurring' => ['This value should not be blank.'],
//                    'valid_from' => ['This value should not be blank.'],
//                ],
//            ],
//            [
//                'data' => '{"title": "bar", "value": 20.5, "amount_of_recurring": "foo"}',
//                'expected' => [
//                    'amount_of_recurring' => ['This value should be of type int.'],
//                    'valid_from' => ['This value should not be blank.'],
//                ],
//            ],
            [
                'data' => json_encode([
                    "title" => "bar",
                    "value" => 20.5,
                    "amount_of_recurring" => 5,
                    "valid_from" => time() + 86400,
                ]),
                'expected' => [
                    'valid_from' => ['The value cannot be in the past.'],
                ],
            ],
            [
                'data' => json_encode([
                    "title" => "bar",
                    "value" => 20.5,
                    "amount_of_recurring" => 5,
                    "valid_from" => time() - 86400,
                    "valid_until" => time() - 86400,
                ]),
                'expected' => [
                    'valid_until' => ['The value cannot be in the future.'],
                ],
            ],
            [
                'data' => json_encode([
                    "title" => "bar",
                    "value" => 20.5,
                    "amount_of_recurring" => 5,
                    "valid_from" => time() - 86400,
                    "valid_until" => time() + 86400,
                ]),
                'expected' => function ($value) {
                    $entity = $this->getTahiniDoctrine()->getRecurringPaymentRepository()->find($value['id']);

                    d($entity);

                    if ($entity) {
                        $this->entities[] = $entity;
                    }

                    $loaded = $this
                        ->getTahiniDoctrine()
                        ->getRecurringPaymentRepository()
                        ->find($entity);
                    $this->assertTrue($loaded != null);
                },
            ],
        ];

        foreach ($operations as $operation) {
            $client = static::createClient();
            $client->request(
                'POST',
                '/api/recurring_payments',
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
        $incomes = $this->createRecurringPayments(1);
        $income = $incomes[0];

        $client = static::createClient();
        $client->request('DELETE', '/api/recurring_payments/' . $income->getId(), [], [], $this->createHeaderWithAccessToken());

        $this->assertEmpty($this->getTahiniDoctrine()->getIncomeRepository()->find($income->getId()));
    }

    /**
     * Testing updating an income.
     */
    public function testUpdate()
    {
        $incomes = $this->createRecurringPayments(1);
        $income = $incomes[0];

        $content = '{"value": 50}';
        $client = static::createClient();
        $client->request(
            'PATCH',
            '/api/recurring_payments/' . $income->getId(),
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

        $default_user_incomes = $this->createRecurringPayments(1);
        $second_user_incomes = $this->createRecurringPayments(1, $second_user);

        // try to access the incomes of another user.
        $client = static::createClient();
        $client->request(
            'GET',
            '/api/recurring_payments',
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
            '/api/recurring_payments',
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
