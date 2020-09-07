import { Query, Resolver } from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "./gql.auth";
import {CurrentUser} from "./current-user.decorator";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";
import {UserModel} from "../user/user.model";

@Resolver()
export class authResolver {

  constructor(private readonly userService: UserService) {
  }

  @Query(returns => UserModel)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return await this.userService.findById(user.id);
  }
}
