import { Injectable } from '@nestjs/common';
const readXlsxFile = require('read-excel-file/node');


@Injectable()
export class FileParseService {

    async parseFile(path: string): Promise<object> {
        const sheets = await readXlsxFile(path, { getSheets: true });

        // go over sheets.

        // extract the years of the sheet.

        // Get the income and expenses for each.

        // return the JSON.

        console.log(sheets);
        return {'foo': path}
    }

}
