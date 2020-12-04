<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FinancularMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param \Illuminate\Http\Request $request
   * @param \Closure $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next) {
    $auth = $request->headers->get('authorization');

    // Search for a token in the DB.

    // Check if the token is expires or not.

    // Load the user and set it on the request.

    //      $request->setUserResolver();
    return $next($request);
  }
}
