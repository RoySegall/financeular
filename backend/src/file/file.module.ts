import { Module } from '@nestjs/common';
import {parseFileCommand} from "./fileParse.command";
import {FileParseService} from "./file-parse.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {File} from "./file.entity";

@Module({
    providers: [parseFileCommand, FileParseService],
    imports: [TypeOrmModule.forFeature([File])]
})
export class FileModule {}
