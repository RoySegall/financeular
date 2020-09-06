import { Module } from '@nestjs/common';
import {User} from "./user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import {UserResolver} from "./user.resolver";
import {SandboxCommand} from "./sandbox.command";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, SandboxCommand]
})
export class UserModule {}
