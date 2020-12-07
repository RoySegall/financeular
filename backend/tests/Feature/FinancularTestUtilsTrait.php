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
use Laravel\Passport\PersonalAccessTokenResult;
use Laravel\Passport\Token;

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
   * @return PersonalAccessTokenResult
   *   The access token it self.
   */
  protected function createAccessToken($user = null, $client = null): PersonalAccessTokenResult {

    if (!$client) {
      $client = $this->createClient();
    }

    if (!$user) {
      $user = $this->createUser();
    }

    return $user->createToken($client->name);
  }

  /**
   * Sending a graphql query with an access token.
   *
   * @param $query
   *   The query to send.
   * @param $token
   *   The token of the user.s
   * @return mixed
   */
  protected function graphQueryWithToken($query, $token) {
    return $this->postGraphQL(['query' => $query], ['Authorization' => 'Bearer ' . $token]);
  }

  /**
   * Uploading file.
   *
   * @param null $file
   *   The file to upload. If nothing will pass then a dummy file will be
   *  created.
   * @param null $access_token
   *   The access token of a user. Optional.
   *
   * @return \Illuminate\Testing\TestResponse
   */
  protected function uploadFile($file = null, $access_token = null) {

    if (!$file) {
      $file = \Illuminate\Http\Testing\File::fake()->create('image.jpg', 500);
    }

    $headers = [];

    if ($access_token) {
      $headers['Authorization'] = 'Bearer ' . $this->accessToken->accessToken;
    }

    return $this->multipartGraphQL(
      [
        'operations' => /** @lang JSON */
          '
            {
                "query": "mutation($file: Upload!) { fileUpload(file: $file) }",
                "variables": {
                    "file": null
                }
            }
        ',
        'map' => /** @lang JSON */
          '
            {
                "0": ["variables.file"]
            }
        ',
      ],
      ['0' => $file],
      $headers
    );
  }

}
