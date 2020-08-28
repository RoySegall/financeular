import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import {FileParseService} from "./file-parse.service";

@Injectable()
export class parseFileCommand {
    constructor(private fileParse: FileParseService) {}

    @Command({
        command: 'file:parse',
        describe: 'Parse a file',
        autoExit: true
    })
    async create(
        @Positional({
            name: 'file_path',
            describe: 'The path to the file',
            type: 'string',
        }) path: string,
    ) {
        const sheets = await this.fileParse.parseFile("/Applications/MAMP/htdocs/financeular/backend/src/file/example_files/dummy_file.xlsx");
    }
}
