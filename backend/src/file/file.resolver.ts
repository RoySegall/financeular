import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import {FileService} from "./file.service";
import {File} from "./file.entity";
import {FileModel} from "./file.model";
import { createWriteStream } from 'fs';

@Resolver()
export class FileResolver {

  constructor(private readonly fileService: FileService) {
  }

  @Query(returns => [FileModel])
  files(): Promise<File[]> {
    return this.fileService.getAll();
  }

  @Mutation(() => Boolean)
  async uploadFile(@Args({name: 'file', type: () => GraphQLUpload}) {
    createReadStream,
    filename
  }): Promise<boolean> {
    // Check that this is an excel file.
    // Set the path folder in an env file
    // If the folder does not exists - create it.
    // Expand the resolver with an error.
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`${__dirname}/uploads/${filename}`))
        .on('finish', (data) => {
          console.log(data);
          resolve(true)
        })
        .on('error', (e) => {
          console.error(e)
          resolve(false)
        })
    );
  }
}
