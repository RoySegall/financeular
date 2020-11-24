<?php

namespace App\Services;
use Symfony\Component\Filesystem\Filesystem;

class ExcelFileProcessorService {

    // Income keys.
    const incomeValueKey = 3;
    const incomeValueName = 4;

    // Limitation Keys.
    const limitationTotalValueKey = 5;
    const limitationOneTimeValueKey = 6;
    const limitationDescriptionKey = 8;
    const limitationAllowedTimesKey = 8;
    const limitationTitleKey = 8;

    // Expenses keys.
    const expenseValueKey = 11;
    const expenseDateKey = 12;
    const expenseTitleKey = 13;

    /**
     * @var Filesystem
     */
    protected $filesystem;

    /**
     * ExcelFileProcessorService constructor.
     */
    function __construct() {
        $this->filesystem = new Filesystem();
    }

    /**
     * Handling an excel file and return the data as an array.
     *
     * @param $file_path
     *   The file path.
     *
     * @return array The parsed data.
     */
    public function processFile($file_path) {
        // Check if the path exists.
        if (!file_exists($file_path)) {
            throw new \Exception('The file does not exists');
        }

        // Check if this an excel file.

        // Read the file.

        $data = \SimpleXLSX::parse('book.xlsx');
        return [];
    }

}
