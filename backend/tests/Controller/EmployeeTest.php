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
        // Get all the items.

        // Count the items.

        // Make sure we can page.
    }

    /**
     * Testing we can add items.
     */
    public function testAdd() {
        // Sending a request without a title.

        // Sending a proper request.
    }

    /**
     * Testing we can search items.
     */
    public function testSearch() {
        // Sending a request with a short search term.

        // Sending a request with a good term and make sure it appears.
    }
}
