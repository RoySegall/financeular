import { Query, Resolver } from '@nestjs/graphql';
import {FileService} from "./file.service";
import {File} from "./file.entity";
import {FileModel} from "./file.model";

@Resolver()
export class FileResolver {

  constructor(private readonly fileService: FileService) {
  }

  @Query(returns => [FileModel])
  files(): Promise<File[]> {
    return this.fileService.getAll();
  }
}
