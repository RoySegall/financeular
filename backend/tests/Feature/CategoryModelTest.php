<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryModelTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Creating a category for testing.
     *
     * @param string $period
     *   The period of the category.
     */
    protected function createCategory($period = 'month') {
        $category = new Category();
        $category->title = $this->faker()->name;
        $category->amount = $this->faker()->numberBetween();
        $category->year = $this->faker()->numberBetween(2019, 2020);
        $category->month = $this->faker()->numberBetween(1, 12);
        $category->period = $period;
        $category->save();
    }

    /**
     * Testing the creation of the model category.
     */
    public function testCategoryCreationWithMonthPeriod() {
        $this->createCategory();
        $this->assertDatabaseHas('categories', ['period' => 'month']);
        $this->assertDatabaseMissing('categories', ['period' => 'month']);
        $this->assertDatabaseCount('categories', 1);
    }

    // todo: test file and rows reference.
}
