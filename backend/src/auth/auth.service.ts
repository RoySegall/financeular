import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userService.getByUsername(username);

    if (!user) {
      return false;
    }

    // todo: encrypt the password before comparing.
    return password == user.password;
  }
}
