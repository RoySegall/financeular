import {Injectable} from "@nestjs/common";
import {Command} from "nestjs-command";
import {UserService} from "../user/user.service";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthCommand {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Command({
    command: 'create_at',
    describe: 'Create an access token for a user',
    autoExit: true
  })
  async create_at(
  ) {
    const user = await this.userService.getByUsername('roy');
    console.log(user);
    const results = await this.authService.login(user);

    console.log(results);
  }

  @Command({
    command: 'create_user',
    describe: 'Creating a user',
    autoExit: true
  })
  async create_user() {
    const results = await this.userService.createUser('sam', '1234');

    console.log(results);
  }
}
