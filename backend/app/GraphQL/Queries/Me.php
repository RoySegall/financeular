<?php

namespace App\GraphQL\Queries;

use Illuminate\Http\Request;

class Me
{

  /**
   * @var Request
   */
    protected $request;

  /**
   * Me constructor.
   *
   * @param Request $request
   */
  public function __construct(Request $request) {
      $this->request = $request;
  }

  /**
   * @param null $_
   * @param array<string, mixed> $args
   */
  public function __invoke($_, array $args) {

    if (!$user = $this->request->user()) {
        throw new \Exception('You are not logged in');
    }

    return $user;
  }
}
