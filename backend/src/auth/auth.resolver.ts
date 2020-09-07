import { Query, Resolver } from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "./gql.auth";
import {CurrentUser} from "./current-user.decorator";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";

@Resolver()
export class authResolver {

  constructor(private readonly userService: UserService) {
  }

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findById(user.id);
  }
}
