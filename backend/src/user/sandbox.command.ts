import {Injectable} from "@nestjs/common";
import {Command} from "nestjs-command";
import {UserService} from "./user.service";

@Injectable()
export class SandboxCommand {
  constructor(private userService: UserService) {}

  @Command({
    command: 'sandbox',
    describe: 'sandbox',
    autoExit: true
  })
  async create(
  ) {
    // todo: add create a token
    // todo: change the name.
    console.log(await this.userService.getByUsername('asdasdasdasdasd'));
  }
}
