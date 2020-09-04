import { Query, Resolver } from '@nestjs/graphql';
import {UserModel} from "./user.model";
import {User} from "./user.entity";
import {UserService} from "./user.service";

@Resolver()
export class UserResolver {

  constructor(private readonly userService: UserService) {
  }

  @Query(returns => [UserModel])
  users(): Promise<User[]> {
    return this.userService.getAll();
  }
}
