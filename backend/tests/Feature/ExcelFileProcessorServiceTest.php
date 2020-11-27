<?php

namespace Tests\Feature;

use App\Services\ExcelFileProcessorService;
use Kint\Kint;
use Mockery\MockInterface;
use Tests\TestCase;

class ExcelFileProcessorServiceTest extends TestCase
{

    protected function getPathFilesPath($type) {
        $types = [
            'original' => getcwd() . '/app/Console/Commands/example_files/dummy_file.xlsx',
            'expected' => getcwd() . '/tests/Feature/parsed_excel_json.json',
        ];

        return $types[$type];
    }
    /**
     * Testing the parsing of the file.
     */
    public function testCompareExpected() {
        $excel_file = new ExcelFileProcessorService();
        $results = $excel_file->processFile($this->getPathFilesPath('original'));

        $this->assertEquals(json_decode(file_get_contents($this->getPathFilesPath('expected')), true), $results);
    }

    /**
     * Testing the command of the excepl parsing.
     */
    public function testExcelParseCommand() {
        $this->mock(ExcelFileProcessorService::class, function(MockInterface $mock) {
            $mock
                ->shouldReceive('processFile')
                ->with('file_path')
                ->andReturn('this is the processed file');
        });

        $this->artisan('excel:process')
            ->expectsQuestion('Please enter the file path', 'file_path');
    }
}
