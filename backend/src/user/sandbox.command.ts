import {Injectable} from "@nestjs/common";
import {Command} from "nestjs-command";
import {UserService} from "./user.service";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class SandboxCommand {
  constructor(private userService: UserService) {}

  @Command({
    command: 'get_user_by_name',
    describe: 'Get the user by name',
    autoExit: true
  })
  async dummy_stuff(
  ) {
    console.log(await this.userService.getByUsername('asdasdasdasdasd'));
  }
}
