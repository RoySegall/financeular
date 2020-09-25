import { Module } from '@nestjs/common';
import {parseFileCommand} from "./fileParse.command";
import {FileParseService} from "./file-parse.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {File} from "./file.entity";
import { FileService } from './file.service';
import {FileResolver} from "./file.resolver";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";

@Module({
    providers: [UserService, parseFileCommand, FileParseService, FileService, FileResolver],
    imports: [TypeOrmModule.forFeature([File, User])]
})
export class FileModule {}
