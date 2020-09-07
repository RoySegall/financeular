import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalStrategy} from "./local.strategy";
import {UserModule} from "../user/user.module";
import {PassportModule} from '@nestjs/passport';
import {UserService} from "../user/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/user.entity";
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants';
import {JwtStrategy} from "./jwt.strategy";
import {ConfigModule} from "@nestjs/config";
import {authResolver} from "./auth.resolver";

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'},
    }),
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy, authResolver]
})
export class AuthModule {
}
