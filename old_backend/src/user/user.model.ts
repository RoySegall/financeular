import { Field, Int, ObjectType } from '@nestjs/graphql';
import {FileModel} from "../file/file.model";

@ObjectType()
export class UserModel {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(type => [FileModel])
  files?: [FileModel];
}
