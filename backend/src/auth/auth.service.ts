import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userService.getByUsername(username);

    if (!user) {
      return false;
    }

    // todo: encrypt the password before comparing.
    return password == user.password;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
