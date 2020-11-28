<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\File;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

trait FinancularTestUtilsTrait {

    use WithFaker, RefreshDatabase;

    /**
     * Creating a user.
     *
     * @return User
     */
    public function createUser() {
        $user = new User();
        $user->name = $this->faker()->name;
        $user->email = $this->faker()->unique()->email;
        $user->password = $this->faker()->password;
        $user->save();

        return $user;
    }

    /**
     * Creating a file.
     *
     * @param $user
     *   The user which owns the file.
     *
     * @return File
     */
    public function createFile($user) {
        $file = new File();
        $file->name = $this->faker()->name;
        $file->path = $this->faker()->name;
        $file->user()->associate($user);
        $file->save();

        return $file;
    }

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

        return $category;
    }

}
