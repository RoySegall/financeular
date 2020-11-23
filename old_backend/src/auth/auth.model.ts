import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginModel {
  @Field(type => String)
  access_token: string;

  @Field(type => Int)
  expires: number;

  @Field(type => String)
  refresh_token: number;
}
