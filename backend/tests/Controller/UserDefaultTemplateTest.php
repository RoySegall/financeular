<?php

namespace App\Tests\Controller;

use App\Entity\AccessToken;
use App\Tests\TahiniBaseWebTestCase;

/**
 * Testing login controller.
 *
 * @package App\Tests\Controller
 */
class UserDefaultTemplateTest extends TahiniBaseWebTestCase
{

    /**
     * Make sure we get the correct income.
     */
    public function testGetTemplate() {
        $this->assertFalse(1 == 1);
    }

    /**
     * Testing setting the income.
     */
    public function testSetTemplate() {
        $this->assertFalse(1 == 1);
    }

}
