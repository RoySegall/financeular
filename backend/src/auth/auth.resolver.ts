import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "./gql.auth";
import {CurrentUser} from "./current-user.decorator";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";
import {UserModel} from "../user/user.model";
import {AuthService} from "./auth.service";
import {LoginModel} from "./auth.model";
import {JwtService} from "@nestjs/jwt";

@Resolver()
export class authResolver {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Query(returns => UserModel)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return await this.userService.findById(user.id);
  }

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

  @Mutation(returns => LoginModel)
  async refreshToken(@Args({ name: 'refresh_token', type: () => String }) refresh_token: string) {
    const decoded = this.jwtService.decode(refresh_token);

    if (decoded['token_type'] !== 'refresh_token') {
      // Not a refresh token.
      throw new Error('This is not a refresh token');
    }

    const date = new Date();
    if ((decoded['created'] - date.getTime()) >= 86400 * 365) {
      // The time for refreshing the token has expired. Login in again.
      throw new Error('This refresh token has expired,');
    }

    const user = await this.userService.findById(decoded['user_id']);
    const results = await this.authService.login(user);
    return results;
  }
}
