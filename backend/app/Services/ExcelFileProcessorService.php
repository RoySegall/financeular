<?php

namespace App\Services;

use App\Exceptions\UnparsedFileType;
use App\Exceptions\UnparsedSheetName;

class ExcelFileProcessorService
{

  // Income keys.
  const INCOME_VALUE_KEY = 5;
  const INCOME_VALUE_NAME = 6;

  // Limitation Keys.
  const LIMITATION_ONE_TIME_VALUE_KEY = 9;
  const LIMITATION_DESCRIPTION_KEY = 11;
  const LIMITATION_TIMES_KEY = 12;
  const LIMITATION_NAME_KEY = 13;

  // Expenses keys.
  const EXPENSE_VALUE_KEY = 17;
  const EXPENSE_DATE_KEY = 18;
  const EXPENSE_TITLE_KEY = 19;

  /**
   * Specifying the supported mime types.
   */
  const ALLOWED_MIME_TYPES = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',];

  /**
   * Holds the months representation in text.
   */
  const MONTHS = [["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],];

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
    $file_type = mime_content_type($file_path);
    if (!in_array($file_type, self::ALLOWED_MIME_TYPES)) {
      UnparsedFileType::raiseFromFileType($file_type);
    }

    // Read the file.
    $xsl = \SimpleXLSX::parse($file_path);

    $data = ['template' => $template, 'currency' => $currency, 'months' => [],];

    $sheets = $xsl->sheetNames();

    foreach ($sheets as $index => $sheet_name) {
      if (!$sheet_name = $this->getMonthFromSheetName($sheet_name)) {
        UnparsedSheetName::raiseFromSheetName($sheet_name);
      }

      $data['months'][$sheet_name] = $this->processSheet($xsl->rows($index), $sheet_name);
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
  public function getMonthFromSheetName($sheet_name) {

    // Get the name of the month and year.
    list($month, $year) = explode(" ", $sheet_name);

    if (!is_string($month)) {
      // For some reason the string is in the wrong order. Flip the
      // variables.
      list($month, $year) = array_reverse([$month, $year]);
    }

    // Go over the array ot months representation.
    foreach (self::MONTHS as $months) {
      $key = array_search($month, $months);

      if (is_int($key)) {
        // We found an item which match the label. Increase by one,
        // since array starts from 0, and return the string formatted.
        $key++;
        return "{$year}_{$key}";
      }
    }

    return null;
  }

  /**
   * Processing a single sheet from a given sheet in the excel file.
   */
  public function processSheet($sheet_data, $sheet_name) {
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

      if ($expense = $this->extractExpenseFromRow($row, $sheet_name)) {
        $expenses[] = $expense;
      }
    }

    return ['limitations' => $limitations, 'incomes' => $incomes, 'expenses' => $expenses,];
  }

  /**
   * Extract the limitation from a row.
   *
   * @param $row
   *   A row in the excel file.
   *
   * @return null
   */
  public function extractLimitationFromRow($row) {
    if (!empty($row[self::LIMITATION_NAME_KEY])) {
      return ["value_per_week" => $row[self::LIMITATION_ONE_TIME_VALUE_KEY], "description" => $row[self::LIMITATION_DESCRIPTION_KEY], "time_per_month" => $row[self::LIMITATION_TIMES_KEY], "title" => $row[self::LIMITATION_NAME_KEY]];
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
  public function extractIncomeFromRow($row) {
    if (!empty($row[self::INCOME_VALUE_KEY])) {
      return ['title' => $row[self::INCOME_VALUE_NAME], 'value' => $row[self::INCOME_VALUE_KEY],];
    }

    return null;
  }

  /**
   * Extract an expenses from row.
   *
   * @param $row
   *   A row in the excel file.
   *
   * @return
   */
  public function extractExpenseFromRow($row, $sheet_name) {
    if (empty($row[self::EXPENSE_TITLE_KEY])) {
      return null;
    }

    $date_from_row = $row[self::EXPENSE_DATE_KEY];

    if (!$time = strtotime($date_from_row)) {
      if (!preg_match('/[0-9]{2}\/[0-9]{2}/u', $date_from_row, $matches)) {
        throw new \Exception('There was an error while trying to process the excel file.');
      }

      list ($day, $month) = explode("/", $date_from_row);
      list($year,) = explode("_", $sheet_name);

      $time = mktime(0, 0, 0, $month, $day, $year);
    }

    return ['title' => $row[self::EXPENSE_TITLE_KEY], 'date' => $time, 'value' => $row[self::EXPENSE_VALUE_KEY],];
  }
}
