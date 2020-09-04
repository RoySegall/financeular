import { Field, Int, ObjectType } from '@nestjs/graphql';
import {FileModel} from "../file/file.model";
import {Column} from "typeorm";
import {Period} from "./category.entity";

@ObjectType()
export class CategoryModel {

  @Field(type => Int)
  id: number;

  @Field(type => String)
  title: string;

  @Field(type => Int)
  amount: number;

  @Field(type => Int)
  year: number;

  @Field(type => Int)
  month: number;

  @Field(type => String)
  period: string;

  @Field(type => FileModel)
  file?: FileModel;
}
