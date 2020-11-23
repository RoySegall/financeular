import { Module } from '@nestjs/common';
import {User} from "./user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import {UserResolver} from "./user.resolver";
import {UserCommand} from "./user.command";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, UserCommand]
})
export class UserModule {}
