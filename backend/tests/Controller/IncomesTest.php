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
     * Testing getting all the entities.
     */
    public function testGetAll()
    {
        $this->fail();
    }

    /**
     * Testing getting a single entity.
     */
    public function testGetSingle()
    {
        $this->fail();
    }

    /**
     * Testing adding an income.
     */
    public function testAdd()
    {
        $this->fail();
    }

    /**
     * Testing deleting an income.
     */
    public function testDelete()
    {
        $this->fail();
    }

    /**
     * Testing updating an income.
     */
    public function testUpdate()
    {
        $this->fail();
    }
}
