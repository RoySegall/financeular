<?php

namespace Tests\Feature;

use Tests\TestCase;

class CategoryModelTest extends TestCase
{
    use FinancularTestUtilsTrait;

    /**
     * Testing the creation of the model category.
     */
    public function testCategoryCreationWithMonthPeriod() {
        $this->createCategory();
        $this->assertDatabaseHas('categories', ['period' => 'month']);
        $this->assertDatabaseMissing('categories', ['period' => 'week']);
        $this->assertDatabaseCount('categories', 1);
    }

    // todo: test file and rows reference.
}
