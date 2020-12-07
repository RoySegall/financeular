<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\GraphQlException;
use App\Services\UserService;
use Illuminate\Auth\SessionGuard;
use Laravel\Passport\Client;

class Login
{

  /**
   * @var UserService
   */
    protected $userService;

  /**
   * Login constructor.
   *
   * @param userService $userService
   */
  public function __construct(UserService $userService) {
      $this->userService = $userService;
  }

  /**
   * @throws GraphQlException
   */
  protected function throwLoginError() {
      throw new GraphQlException('The password or user are incorrect', null, 'login');
  }

  /**
   * Handle the login.
   *
   * @param null $_
   * @param array $args
   */
  public function __invoke($_, array $args) {

      [$email, $password, $client_id, $client_secret] = [
        $args['email'], $args['password'],
        $args['client_id'], $args['client_secret']
      ];

      // Get the user by the email.
      if (!$user = $this->userService->getUserByEmail($email)) {
          $this->throwLoginError();
      }

      // Verify the password matches.
      if (!$this->userService->validateUserPassword($user, $password)) {
          $this->throwLoginError();
      }

      // Query for the app.
      $client = Client::where(function ($query) use ($client_id, $client_secret) {
          $query->where('id', $client_id)->where('secret', $client_secret);
      });

    if (!$client->exists()) {
        $this->throwLoginError();
    }

      /** @var SessionGuard $foo */
      $token = $user->createToken($client->first()->name);

      // Create: token, refresh token and expires.
      return [
      'accessToken' => $token->accessToken,
      'expires' => $token->token->expires_at->timestamp,
      ];
  }
}
