import {AuthService} from "./auth.service";
import {User} from "../user/user.entity";

describe('Testing the auth service', () => {

  let authService: AuthService;
  let jwtServiceMock;
  let jwtService;
  let signMock;

  beforeEach(() => {
    jwtService = jest.fn();
    signMock = jest.fn();

    jwtServiceMock = new (jest.fn(() => ({
      sign: signMock,
    })))();

    authService = new AuthService(jwtServiceMock);
  });

  it('Testing the login method', async () => {
    const user = new User();
    user.id = 42;

    signMock.mockImplementation(({user_id, token_type}) => {
      return `${user_id}_${token_type}`;
    });

    expect(await authService.login(user)).toStrictEqual(      {
      access_token: '42_access_token',
      expires: 86400,
      refresh_token: '42_refresh_token'
    });
  });
});
