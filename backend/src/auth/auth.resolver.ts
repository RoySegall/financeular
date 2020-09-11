import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "./gql.auth";
import {CurrentUser} from "./current-user.decorator";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";
import {UserModel} from "../user/user.model";
import {AuthService} from "./auth.service";
import {ExceptionHandler} from "@nestjs/core/errors/exception-handler";
import {LoginModel} from "./auth.model";

@Resolver()
export class authResolver {

  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Query(returns => UserModel)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return await this.userService.findById(user.id);
  }

  // todo: create resolver for refresh token.
  @Mutation(returns => LoginModel)
  async login(
    @Args({ name: 'username', type: () => String }) username: string,
    @Args({ name: 'password', type: () => String }) password: string
  ) {

    const user = await this.userService.getByUsernameAndPassword(username, password);

    if (user) {
      const results = await this.authService.login(user);

      return results;
    }

    throw new Error('Username or password are wrong. Please check again');
  }
}
