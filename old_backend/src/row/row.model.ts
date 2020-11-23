import { Field, Int, ObjectType } from '@nestjs/graphql';
import {CategoryModel} from "../category/category.model";
import {FileModel} from "../file/file.model";

@ObjectType()
export class RowModel {

  @Field(type => Int)
  id: number;

  @Field(type => String)
  title: number;

  @Field(type => Date)
  date: Date;

  @Field(type => FileModel)
  file?: FileModel;

  @Field(type => CategoryModel)
  category?: CategoryModel;
}
