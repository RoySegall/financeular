<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\GraphQlException;
use App\Models\File;
use App\Services\ExcelFileProcessorService;
use GuzzleHttp\Psr7\MimeType;
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

    if (!$user = $this->request->user()) {
      throw new GraphQlException('You are not allowed to upload a file.', null, 'authorization');
    }

    if ($user->files()->count() > 10) {
      throw new GraphQlException('You cannot upload more than 10 files.', null, 'authorization');
    }

    /** @var \Illuminate\Http\UploadedFile $file */
    $file = $args['file'];

    $supported = [MimeType::fromExtension('xlsx')];

    if (!in_array($file->getMimeType(), $supported)) {
      throw new GraphQlException('The uploaded file is not supported');
    }

    $path = $file->storePublicly('uploads');

    $file_model = new File();
    $file_model->name = $file->getClientOriginalName();
    $file_model->path = $path;
    $file_model->user_id = $user->id;
    $file_model->save();

    return $file_model;
  }
}
