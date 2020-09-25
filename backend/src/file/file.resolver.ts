import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import {FileService} from "./file.service";
import {File} from "./file.entity";
import {FileModel, UploadFileModel} from "./file.model";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/gql.auth";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Resolver()
export class FileResolver {

  constructor(private readonly fileService: FileService, private readonly userService: UserService,) {
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [FileModel])
  files(): Promise<File[]> {
    // todo: Filter by user ID.
    return this.fileService.getAll();
  }

  @Mutation(() => UploadFileModel)
  @UseGuards(GqlAuthGuard)
  async uploadFile(
    @Args({name: 'file', type: () => GraphQLUpload}) file,
    @CurrentUser() user: User
  ): Promise<object> {
    const userFromDb = await this.userService.findById(user.id);
    return this.fileService.saveFile(file, userFromDb);
  }
}
