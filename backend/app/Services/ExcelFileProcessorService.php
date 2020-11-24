<?php

namespace App\Services;

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
     * Specifying the supported mime types.
     */
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

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
        if (!in_array(mime_content_type($file_path), self::allowedTypes)) {
            throw new \Exception('The file does not exists');
        }

        // Read the file.
        $parsed_file = \SimpleXLSX::parse($file_path);

        return [];
    }

    /**
     * Processing a single sheet from a given sheet in the excel file.
     *
     * @param $sheet
     *   The sheet name.
     */
    protected function processSheet($sheet) {
    }

}
