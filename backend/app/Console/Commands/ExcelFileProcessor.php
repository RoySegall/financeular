<?php

namespace App\Console\Commands;

use App\Services\ExcelFileProcessorService;
use Illuminate\Console\Command;

use function Kint\Kint;

class ExcelFileProcessor extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'excel:process';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Processing a single excel file for testing the real service';

    /**
     * @var ExcelFileProcessorService
     */
    protected $excelFileProcessor;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(ExcelFileProcessorService $excel_file_processor)
    {
        parent::__construct();

        $this->excelFileProcessor = $excel_file_processor;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file_path = $this->ask('Please enter the file path');
        \Kint::dump($this->excelFileProcessor->processFile($file_path));
    }
}
