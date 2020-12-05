<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Passport\Token;
use Lcobucci\JWT\Parser as JwtParser;

class FinancularMiddleware
{

  /**
   * @var JwtParser
   */
  public $jwt;

  /**
   * FinancularMiddleware constructor.
   *
   * @param JwtParser $jwt
   */
  public function __construct(JwtParser $jwt) {
    $this->jwt = $jwt;
  }

  /**
   * Handle an incoming request.
   *
   * @param \Illuminate\Http\Request $request
   * @param \Closure $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next) {
    $auth = $request->headers->get('authorization');

    try {
      list ($type, $token) = explode(" ", $auth);
    } catch (\Exception $e) {
      return $next($request);
    }

    if ($type != 'Bearer') {
      return $next($request);
    }

    // Parsing the token.
    try {
      $parsed_id = $this->jwt->parse($token)->claims()->get('jti');
    } catch (\Exception $e) {
      return $next($request);
    }

    // Search for a token in the DB.
    $token_query = Token::where('id', $parsed_id);
    if (!$token_query->exists()) {
      return $next($request);
    }

    /** @var Token $token */
    $token = $token_query->first();

    // Check if the token is expires or not.
    if ($token->expires_at->isPast()) {
      return $next($request);
    }

    // Check if the client exists.
    if (!$token->client()->exists()) {
      return $next($request);
    }

    // Load the user and set it on the request.
    $request->setUserResolver(function () use ($token) {
      return $token->user()->first();
    });

    return $next($request);
  }
}
