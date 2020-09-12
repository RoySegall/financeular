import {UserService} from "./user.service";

describe('Testing the user service', () => {

  let userService;
  let UserRepoMock;
  let findMock;
  beforeEach(() => {
    findMock = jest.fn();

    UserRepoMock = new (jest.fn(() => ({
      find: findMock,
    })))();

    userService = new UserService(UserRepoMock);
  });

  it('Testing the getAll function', async () => {
    findMock.mockImplementation((args) => {
      expect(args).toStrictEqual({ relations: [ 'files' ] })
      return {id: 42};
    });

    expect(await userService.getAll()).toStrictEqual({id: 42});
  });

  it('Testing the findById function', async () => {
    findMock.mockImplementation((args) => {
      expect(args).toStrictEqual({"where": {"id": 42}})
      return [{id: 42}];
    });

    expect(await userService.findById(42)).toStrictEqual({id: 42});
  });

  it('Testing the getByUsername function', async () => {
    findMock.mockImplementation((args) => {
      expect(args).toStrictEqual({ where: { username: 'steve' } })
      return [{id: 42}];
    });

    expect(await userService.getByUsername('steve')).toStrictEqual({id: 42});
  });
});
