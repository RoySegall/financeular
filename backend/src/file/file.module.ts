import { Module } from '@nestjs/common';
import {parseFileCommand} from "./fileParse.command";
import {FileParseService} from "./file-parse.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {File} from "./file.entity";
import { FileService } from './file.service';
import {FileResolver} from "./file.resolver";

@Module({
    providers: [parseFileCommand, FileParseService, FileService, FileResolver],
    imports: [TypeOrmModule.forFeature([File])]
})
export class FileModule {}
