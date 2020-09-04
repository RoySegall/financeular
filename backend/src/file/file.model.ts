import { Field, Int, ObjectType } from '@nestjs/graphql';
import {UserModel} from "../user/user.model";

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
}
