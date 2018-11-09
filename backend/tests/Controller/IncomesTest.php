<?php

namespace App\Tests\Controller;

use App\Entity\AccessToken;
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
    protected function createIncomes($amount = 30)
    {
        $manager = $this->getDoctrine()->getManager();

        $incomes = [];
        for ($i = 0; $i < $amount; $i++) {
            $income = new Income();
            $income->setUser($this->user);
            $income->setValue(rand(100, 500));
            $income->setStartingDate(time());
            $income->setCurrent($i === 0);

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
//
//    /**
//     * Testing adding an income.
//     */
//    public function testAdd()
//    {
//        $this->fail();
//    }
//
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
//
//    /**
//     * Testing updating an income.
//     */
//    public function testUpdate()
//    {
//        $this->fail();
//    }
}
