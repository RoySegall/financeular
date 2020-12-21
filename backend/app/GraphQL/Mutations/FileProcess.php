<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\GraphQlException;
use App\Models\File;
use App\Models\Limitation;
use App\Services\ExcelFileProcessorService;
use Illuminate\Http\Request;

class FileProcess
{
  /**
   * @var Request
   */
  protected $request;

  /**
   * @var ExcelFileProcessorService
   */
  protected $excelService;

  /**
   * Me constructor.
   *
   * @param Request $request
   *   The request service.
   * @param ExcelFileProcessorService $excel_process_file
   *   The excel process service.
   */
  public function __construct(Request $request, ExcelFileProcessorService $excel_process_file) {
    $this->request = $request;
    $this->excelService = $excel_process_file;
  }

  /**
   * @param null $_
   * @param array<string, mixed> $args
   */
  public function __invoke($_, array $args) {
    $file = File::where('id', $args['id'])->first();

    // Process the file.
    try {
      $results = $this->excelService->processFile($file->path);
    } catch (\Exception $e) {

      // Set the status with the error and throw the exception.
      $file->errors = $e->getMessage();
      $file->status = File::STATUS_ERRORED;
      $file->save();

      throw new GraphQlException('There was an error wile processing the file. Please contact costumer success');
    }

    $this->excelService->inflateToDb($results, $file);

    $file->status = File::STATUS_PASSED;
    $file->save();

    // Return the payload data.
    return $file;
  }
}
