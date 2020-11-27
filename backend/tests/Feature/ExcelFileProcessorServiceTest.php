<?php

namespace Tests\Feature;

use App\Services\ExcelFileProcessorService;
use Kint\Kint;
use Mockery\MockInterface;
use Tests\TestCase;

class ExcelFileProcessorServiceTest extends TestCase
{
    /**
     * Testing the parsing of the file.
     */
    public function testCompareExpected() {
        $original_file_path = getcwd() . '/app/Console/Commands/example_files/dummy_file.xlsx';
        $expected_file_path = getcwd() . '/tests/Feature/parsed_excel_json.json';

        $excel_file = new ExcelFileProcessorService();
        $results = $excel_file->processFile($original_file_path);

        // todo: cover more tests.
        $this->assertEquals(json_decode(file_get_contents($expected_file_path), true), $results);
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
