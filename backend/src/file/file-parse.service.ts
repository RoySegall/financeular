import {Injectable} from '@nestjs/common';
import {parsedSheetName, ParsedSheetRow, Income, Limitation, Expense, ParsedFile} from "./file.interface";
const readXlsxFile = require('read-excel-file/node');

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

@Injectable()
export class FileParseService {

  /**
   * Parsing a given sheet.
   *
   * @param filePath
   *  The file path we need to parse.
   * @param sheetName
   *  The sheet name in the file.
   */
  async parseSheet(filePath: string, sheetName: string): Promise<ParsedSheetRow[]> {
    const sheetData = await readXlsxFile(filePath, {sheet: sheetName});

    const sheetsRows: ParsedSheetRow[] = [];
    let index = 0;

    for await (const sheetRow of sheetData) {

      if (index < 2) {
        index++;
        continue;
      }

      sheetsRows.push(this.handleRow(sheetRow));
      index++;
    }

    return sheetsRows;
  }

  /**
   * Handling a specific row in a given sheet from the file.
   *
   * @param row
   *  The row to handle.
   */
  handleRow(row): ParsedSheetRow {
    const baseRow: ParsedSheetRow = {
      limitation: undefined,
      income: undefined,
      expense: undefined
    };

    if (row[incomeValueName]) {
      baseRow.income = <Income>{
        'title': row[incomeValueName],
        'value': row[incomeValueKey]
      };
    }

    if (row[limitationTotalValueKey]) {
      baseRow.limitation = <Limitation>{
        total_value: row[limitationTotalValueKey],
        value_per_week: row[limitationOneTimeValueKey],
        description: row[limitationDescriptionKey],
        time_per_month: row[limitationAllowedTimesKey],
        title: row[limitationTitleKey],
      };
    }

    if (row[expenseValueKey]) {
      baseRow.expense = <Expense>{
        value: row[expenseValueKey],
        date: row[expenseDateKey],
        title: row[expenseTitleKey],
      };
    }

    return baseRow;
  }
  /**
   * Get the month number and the year from the name of the sheet.
   *
   * @param sheetName
   *  The name of the sheet.
   */
  getDateDataFromSheetName(sheetName: string): parsedSheetName {
    const optionalMonthsNames = [
      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
    ];

    const items = sheetName.split(' ');
    let year, month;

    if (isNaN(parseInt(items[0]))) {
      year = items[1];
      month = items[0];
    } else {
      year = items[0];
      month = items[1];
    }

    let selectedMonth = null;
    optionalMonthsNames.map((monthsByLanguage) => {
      monthsByLanguage.map((monthByLanguage, key) => {
        if (monthByLanguage === month) {
          selectedMonth = key + 1;
        }
      })
    });

    return {month: selectedMonth, year: year}
  }

  /**
   * Parsing the file from a given path.
   *
   * @param path
   *  The path of the file.
   * @param template
   *  The template of the excel file.
   * @param currency
   *  The currency from the excel file.
   */
  async parseFile(path: string, template = 'with_limitation', currency = 'nis'): Promise<ParsedFile> {
    // Set the default value.
    const defaultReturn = {currency, template, months: {}}
    const sheetsNames = await readXlsxFile(path, {getSheets: true});

    for await (const sheetName of sheetsNames) {
      const {month, year} = this.getDateDataFromSheetName(sheetName['name']);
      defaultReturn.months[`${year}_${month}`] = await this.parseSheet(path, sheetName['name']);
    }

    return defaultReturn;
  }

}
