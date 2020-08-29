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
  parseSheet(filePath: string, sheetName: string): parseSheet {
    const {month, year} = this.getDateDataFromSheetName(sheetName);

    return {month, year, results: this.getDataForMonth()}
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

  getDataForMonth(): object {
    return {
      limitations: {},
      income: {},
      expenses: {}
    }
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
  async parseFile(path: string, template: string = 'with_limitation', currency: string = 'nis'): Promise<object> {
    // Set the default value.
    const defaultReturn = {currency, template, months: {}}

    const sheetsNames = await readXlsxFile(path, {getSheets: true});

    sheetsNames.map(async ({name: sheetName}) => {
      const {month, year, results} = this.parseSheet(path, sheetName);
      defaultReturn.months[`${year}_${month}`] = results;
    });

    // go over sheets.

    // extract the years of the sheet.

    // Get the income and expenses for each.

    // return the JSON.

    console.log(defaultReturn);

    return defaultReturn;
  }

}
