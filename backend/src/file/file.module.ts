import { Module } from '@nestjs/common';
import {parseFileCommand} from "./fileParse.command";
import {FileParseService} from "./file-parse.service";

@Module({
    providers: [parseFileCommand, FileParseService]
})
export class FileModule {}
