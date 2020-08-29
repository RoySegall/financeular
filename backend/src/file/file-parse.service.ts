import {Injectable} from '@nestjs/common';
import {parsedSheetName, parseSheet} from "./file.interface";

const readXlsxFile = require('read-excel-file/node');

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
  async parseSheet(filePath: string, sheetName: string): Promise<object> {
    const sheetData = await readXlsxFile(filePath, {sheet: sheetName});

    for await (let sheetRow of sheetData) {
      this.handleRow(sheetRow);
    }

    return {
      limitations: {},
      income: {},
      expenses: {}
    };
  }

  /**
   * Handling a specific row in a given sheet from the file.
   *
   * @param row
   *  The row to handle.
   */
  handleRow(row): object {
    console.log(row);
    return {};
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
  async parseFile(path: string, template = 'with_limitation', currency = 'nis'): Promise<object> {
    // Set the default value.
    const defaultReturn = {currency, template, months: {}}

    const sheetsNames = await readXlsxFile(path, {getSheets: true});

    for await (let sheetName of sheetsNames) {
      const results = await this.parseSheet(path, sheetName['name']);
      const {month, year} = this.getDateDataFromSheetName(sheetName['name']);
      defaultReturn.months[`${year}_${month}`] = results;
    }

    console.log(defaultReturn);

    return defaultReturn;
  }

}
