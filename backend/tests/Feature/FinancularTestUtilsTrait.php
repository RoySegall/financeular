<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Expense;
use App\Models\File;
use App\Models\Income;
use App\Models\Limitation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\Client;
use Laravel\Passport\PersonalAccessClient;

trait FinancularTestUtilsTrait
{

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
    $user->password = Hash::make('password');
    $user->save();

    return $user;
  }

  /**
   * Creating a file.
   *
   * @param $user
   *   The user which owns the file. Optional.
   *
   * @return File
   */
  public function createFile($user = null) {

    if (!$user) {
      $user = $this->createUser();
    }

    $file = new File();
    $file->name = $this->faker()->name;
    $file->path = $this->faker()->name;
    $file->user()->associate($user);
    $file->save();

    return $file;
  }

  /**
   * Creating a limitation.
   *
   * @param $file
   *   The file which the limitation belongs to. Optional.
   *
   * @return Limitation
   *   The model we created.
   */
  public function createLimitation($file = null) {
    if (!$file) {
      $file = $this->createFile();
    }

    $limitation = new Limitation();
    $limitation->file_id = $file->id;
    $limitation->month = $this->faker()->numberBetween(1, 12);
    $limitation->year = $this->faker()->numberBetween(2019, 2020);
    $limitation->value_per_week = $this->faker()->numberBetween(0, 500);
    $limitation->description = $this->faker()->sentence;
    $limitation->time_per_month = $this->faker()->numberBetween(0, 10);
    $limitation->title = $this->faker()->sentence;
    $limitation->save();

    return $limitation;
  }

  /**
   * Creating an income.
   *
   * @param null $file
   *   The file which the limitation belongs to. Optional.
   *
   * @return Income
   */
  public function createIncome($file = null) {
    if (!$file) {
      $file = $this->createFile();
    }

    $income = new Income();
    $income->file_id = $file->id;
    $income->month = $this->faker()->numberBetween(1, 12);
    $income->year = $this->faker()->numberBetween(2019, 2020);
    $income->title = $this->faker()->sentence;
    $income->value = $this->faker()->numberBetween(0, 500);

    $income->save();

    return $income;
  }

  /**
   * Create an expense for a file.
   *
   * @param null $file
   *   The file which the limitation belongs to. Optional.
   *
   * @return Expense
   */
  public function createExpense($file = null) {
    if (!$file) {
      $file = $this->createFile();
    }

    $expense = new Expense();
    $expense->file_id = $file->id;
    $expense->month = $this->faker()->numberBetween(1, 12);
    $expense->year = $this->faker()->numberBetween(2019, 2020);
    $expense->title = $this->faker()->sentence;
    $expense->value = $this->faker()->numberBetween(0, 500);
    $expense->date = $this->faker()->date();
    $expense->save();

    return $expense;
  }

  /**
   * @return Client
   */
  public function createClient() {
    $client = new Client();
    $client->name = $this->faker()->name;
    $client->secret = $this->faker()->uuid;
    $client->redirect = 'http://google.com';
    $client->personal_access_client = true;
    $client->password_client = false;
    $client->revoked = false;
    $client->save();

    $personal = new PersonalAccessClient();
    $personal->client_id = $client->id;
    $personal->save();

    return $client;
  }

  /**
   * Creating an access token for a user.
   *
   * @param null $user
   *   The user object. Optional. If null is passed then a new user will be
   *   created.
   * @param null $client
   *   The client which the token will be associated with. Optional. If null is
   *   passed then a new client will be created.
   *
   * @return string
   *   The access token it self.
   */
  protected function createAccessToken($user = null, $client = null) {

    if (!$client) {
      $client = $this->createClient();
    }

    if (!$user) {
      $user = $this->createUser();
    }

    $created_access_token = $user->createToken($client->name);

    return $created_access_token->accessToken;
  }

}
