<?php

namespace App\Exceptions;

use Exception;
use Nuwave\Lighthouse\Exceptions\RendersErrorsExtensions;

class GraphQlException extends Exception implements RendersErrorsExtensions
{
  /**
   * @var @string
   */
  protected $reason;

  /**
   * @var string
   */
  protected $category;

  /**
   * GraphQlException constructor.
   *
   * @param string $message
   *  The message of the exception.
   * @param string $reason
   *  The reason for the exception.
   * @param string|null $category
   *  The category of the failure.
   */
  public function __construct(string $message, string $reason, string $category = NULL)
  {
    parent::__construct($message);

    $this->reason = $reason;
    $this->category = $category ? $category : 'custom';
  }

  /**
   * Returns true when exception message is safe to be displayed to a client.
   *
   * @api
   * @return bool
   */
  public function isClientSafe(): bool
  {
    return true;
  }

  /**
   * Returns string describing a category of the error.
   *
   * Value "graphql" is reserved for errors produced by query parsing or
   * validation, do not use it.
   *
   * @api
   * @return string
   */
  public function getCategory(): string
  {
    return $this->category;
  }

  /**
   * Return the content that is put in the "extensions" part of the returned
   * error.
   *
   * @return array
   */
  public function extensionsContent(): array
  {
    return [
      'some' => 'additional information',
      'reason' => $this->reason,
    ];
  }
}
