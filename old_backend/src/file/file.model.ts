import { Field, Int, ObjectType } from '@nestjs/graphql';
import {UserModel} from "../user/user.model";
import {CategoryModel} from "../category/category.model";
import {RowModel} from "../row/row.model";

@ObjectType()
export class FileModel {

  @Field(type => Int)
  id: number;

  @Field(type => String)
  name: string;

  @Field(type => String)
  path: string;

  @Field(type => Date)
  createDate: Date;

  @Field(type => UserModel)
  user?: UserModel;

  @Field(type => [CategoryModel])
  categories?: [CategoryModel];

  @Field(type => [RowModel])
  rows?: [RowModel];
}

@ObjectType()
export class UploadFileModel {
  @Field(type => String)
  status: string;

  @Field(type => String)
  message: string;

  @Field(type => String)
  fileId?: string;
}
