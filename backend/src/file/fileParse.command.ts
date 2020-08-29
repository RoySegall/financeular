import { Command } from 'nestjs-command';
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
    ) {
        await this.fileParse.parseFile("/Applications/MAMP/htdocs/financeular/backend/src/file/example_files/dummy_file.xlsx");
    }
}
