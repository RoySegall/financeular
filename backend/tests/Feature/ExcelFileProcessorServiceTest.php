<?php

namespace Tests\Feature;

use App\Services\ExcelFileProcessorService;
use Mockery\MockInterface;
use Tests\TestCase;

class ExcelFileProcessorServiceTest extends TestCase
{

    /**
     * Get path for a file based on the type.
     *
     * @param $type
     *   The type of the file.
     * @return string
     *   The path of the file.
     */
    protected function getPathsForFiles($type) {
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
        $results = $excel_file->processFile($this->getPathsForFiles('original'));
        $this->assertEquals(json_decode(file_get_contents($this->getPathsForFiles('expected')), true), $results);
    }

    /**
     * Testing the command of the excepl parsing.
     */
    public function testExcelParseCommand() {
        $this->mock(ExcelFileProcessorService::class, function(MockInterface $mock) {
            $mock
                ->shouldReceive('processFile')
                ->with($this->getPathsForFiles('original'))
                ->andReturn('this is the processed file');
        });

        $this->artisan('excel:process')
            ->expectsQuestion('Please enter the file path', $this->getPathsForFiles('original'));
    }

    /**
     * Testing the exception which are being thrown.
     */
    public function testExceptions() {
        $xsl_service = new ExcelFileProcessorService();

        try {
            $xsl_service->processFile('foo');
            $this->fail();
        } catch (\Exception $e) {
            $this->assertEquals($e->getMessage(), 'The file does not exists');
        }
    }
}
