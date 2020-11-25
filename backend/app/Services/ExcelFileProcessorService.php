<?php

namespace App\Services;

class ExcelFileProcessorService {

    // Income keys.
    const incomeValueKey = 5;
    const incomeValueName = 6;

    // Limitation Keys.
    const limitationOneTimeValueKey = 9;
    const limitationDescriptionKey = 11;
    const limitationTimesKey = 12;
    const limitationNameKey = 13;

    // Expenses keys.
    const expenseValueKey = 11;
    const expenseDateKey = 12;
    const expenseTitleKey = 13;

    /**
     * Specifying the supported mime types.
     */
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    /**
     * Holds the months representation in text.
     */
    const months = [
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
    ];

    /**
     * Handling an excel file and return the data as an array.
     *
     * @param $file_path
     *   The file path.
     *
     * @return array The parsed data.
     */
    public function processFile($file_path, $template = 'with_limitation', $currency = 'nis') {
        // Check if the path exists.
        if (!file_exists($file_path)) {
            throw new \Exception('The file does not exists');
        }

        // Check if this an excel file.
        if (!in_array(mime_content_type($file_path), self::allowedTypes)) {
            throw new \Exception('The file does not exists');
        }

        // Read the file.
        $xsl = \SimpleXLSX::parse($file_path);

        $data = [
            'template' => $template,
            'currency' => $currency,
            'months' => [],
        ];

        $sheets = $xsl->sheetNames();
        foreach ($sheets as $index => $sheet_name) {
            if (!$sheet_name = $this->getMonthFromSheetName($sheet_name)) {
                throw new \Exception("There was an issue getting numeric representation for {$sheet_name}. Please fix the label and try again.");
            }

            $data['months'][$sheet_name] = $this->processSheet($xsl->rows($index));
        }

        return $data;
    }

    /**
     * Get the numeric representation of the month's name.
     *
     * @param $sheet_name
     *   The sheet name.
     *
     * @return string
     *   A representation of the sheet in the format of YEAR_MONTH.
     */
    protected function getMonthFromSheetName($sheet_name) {

        // Get the name of the month and year.
        list($month, $year) = explode(" ", $sheet_name);

        if (!is_string($month)) {
            // For some reason the string is in the wrong order. Flip the
            // variables.
            list($month, $year) = array_reverse([$month, $year]);
        }

        // Go over the array ot months representation.
        foreach (self::months as $months) {
            $key = array_search($month, $months);

            if (is_int($key)) {
                // We found an item which match the label. Increase by one,
                // since array starts from 0, and return the string formatted.
                $key++;
                return "{$year}_{$key}";
            }
        }

        return NULL;
    }

    /**
     * Processing a single sheet from a given sheet in the excel file.
     */
    protected function processSheet($sheet_data) {
        $limitations = [];
        $incomes = [];
        $expenses = [];

        foreach ($sheet_data as $index => $row) {
            if (!array_filter($row)) {
                continue;
            }

            if ($index < 3) {
                continue;
            }

            if ($limitation = $this->extractLimitationFromRow($row)) {
                $limitations[] = $limitation;
            }

            if ($income = $this->extractIncomeFromRow($row)) {
                $incomes[] = $income;
            }

            if ($expense = $this->extractExpenseFromRow($row)) {
                $expenses[] = $expense;
            }
        }

        return [
            'limitations' => $limitations,
            'incomes' => $incomes,
            'expenses' => $expenses,
        ];
    }

    /**
     * Extract the limitation from a row.
     *
     * @param $row
     *   A row in the excel file.
     *
     * @return null
     */
    protected function extractLimitationFromRow($row) {
        if (!empty($row[self::limitationNameKey])) {
            return [
                "value_per_week" => $row[self::limitationOneTimeValueKey],
                "description" => $row[self::limitationDescriptionKey],
                "time_per_month" => $row[self::limitationTimesKey],
                "title" => $row[self::limitationNameKey]
            ];
        }
        return null;
    }

    /**
     * Extracting the income form a given row.
     *
     * @param $row
     *   A row in the excel file.
     *
     * @return array|null
     *   An array with title and value.
     */
    protected function extractIncomeFromRow($row) {
        if (!empty($row[self::incomeValueKey])) {
            return [
                'title' => $row[self::incomeValueKey],
                'value' => $row[self::incomeValueName],
            ];
        }

        return NULL;
    }

    /**
     * Extract an expenses from row.
     *
     * @param $row
     *   A row in the excel file.
     *
     * @return
     */
    protected function extractExpenseFromRow($row) {
        return null;
    }

}
