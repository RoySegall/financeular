<?php

namespace App\Console\Commands;

use App\Services\UserService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateUserCommand extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'financeular:user-create';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Creating a user. Used for post deployment.';

  /**
   * The user service.
   *
   * @var UserService
   */
  protected $userService;

  /**
   * Create a new command instance.
   *
   * @param UserService $user_service
   *   The user service.
   */
  public function __construct(UserService $user_service) {
    parent::__construct();

    $this->userService = $user_service;
  }

  /**
   * Execute the console command.
   */
  public function handle() {
    $email = $this->ask('Enter the user email');

    // Check email.
    Validator::make(['email' => $email], ['email' => 'email'])
      ->validate();

    // Verify the email is unique.
    if ($this->userService->getUserByEmail($email)) {
      throw new \Exception('The email already exists');
    }

    $password = $this->secret('Enter the user password');
    $name = $this->secret('Enter the name of the user');

    $this->userService->createUser($email, Hash::make($password), $name);
  }
}
