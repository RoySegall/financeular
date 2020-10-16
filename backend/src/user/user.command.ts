import {Injectable} from "@nestjs/common";
import {Command} from "nestjs-command";
import {UserService} from "./user.service";
import {User} from "./user.entity";

@Injectable()
export class UserCommand {
  constructor(private userService: UserService) {}

  @Command({
    command: 'get_user_by_name',
    describe: 'Get the user by name',
    autoExit: true
  })
  async dummy_stuff() {
    console.log(await this.userService.getByUsername('asdasdasdasdasd'));
  }

  @Command({
    command: 'seed:users',
    describe: 'Seeding the users',
    autoExit: true
  })
  async seed_users() {
    const users = [
      {username: 'first_example_user', password: '1234'},
      {username: 'second_example_user', password: '5678'},
    ];

    console.log('Start to seed users');

    for (const user of users) {
      const results = await this.userService.createUser(user.username, user.password);
      console.log(results);
    }
  }
}
