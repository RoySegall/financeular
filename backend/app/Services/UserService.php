<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

/**
 * The user service.
 *
 * @package App\Services
 */
class UserService
{

  /**
   * Getting a user by a string.
   *
   * @param $email
   *   The email of the user.
   *
   * @return User|null
   */
  public function getUserByEmail(string $email) {
      return User::where('email', $email)->first();
  }

  /**
   * Checking the user password.
   *
   * @param User $user
   *  The user object.
   * @param $password
   *  The password.
   *
   * @return bool
   */
  public function validateUserPassword(User $user, $password): bool {
      return Hash::check($password, $user->getAuthPassword());
  }
}
