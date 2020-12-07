<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\GraphQlException;
use Illuminate\Http\Request;

class FileUpload
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
      throw new GraphQlException('You are not allowed to upload a file.', null, 'authorization');
    }

    if ($user->files()->count() > 10) {
      throw new GraphQlException('You cannot upload more than 10 files.', null, 'authorization');
    }

    /** @var \Illuminate\Http\UploadedFile $file */
    $file = $args['file'];

    print($file->storePublicly('uploads'));
    return "a";
  }
}
