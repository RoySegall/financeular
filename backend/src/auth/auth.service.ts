import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import {Login} from "./auth.interface";
import {ExpiresInInteger} from "./auth.consts";

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(user: any): Promise<Login> {

    const date = new Date();

    return {
      access_token: this.jwtService.sign({
        user_id: user.id,
        token_type: "access_token"
      }),
      expires: ExpiresInInteger,
      refresh_token: this.jwtService.sign({
        user_id: user.id,
        token_type: "refresh_token",
        created: date.getTime(),
      }),
    };
  }
}
