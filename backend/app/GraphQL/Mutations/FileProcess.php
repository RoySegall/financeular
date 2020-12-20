<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\GraphQlException;
use Illuminate\Http\Request;

class FileProcess
{
  /**
   * @var Request
   */
  protected $request;

  /**
   * Me constructor.
   *
   * @param Request $request
   *   The request service.
   */
  public function __construct(Request $request) {
    $this->request = $request;
  }

  /**
   * @param null $_
   * @param array<string, mixed> $args
   */
  public function __invoke($_, array $args) {
    // Check first the user is logged in.
    if (!$user = $this->request->user()) {
      throw new GraphQlException('You are not logged in');
    }

    // Check the file exists.

    // Check the user has permission to the file.

    // Process the file.

    // Store any errors.

    // Return the payload data.
  }
}
