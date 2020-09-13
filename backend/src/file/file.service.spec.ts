import { FileService } from './file.service';

describe('Testing the file service', () => {
  let fileService: FileService;
  let fileRepoMock;
  let findMock;

  beforeEach(() => {
    findMock = jest.fn();

    fileRepoMock = new (jest.fn(() => ({
      find: findMock,
    })))();

    fileService = new FileService(fileRepoMock);
  });

  it('Testing the getAll method', async () => {
    findMock.mockImplementation((args) => {
      expect(args).toStrictEqual({relations: ['user', 'categories', 'rows']})
      return {id: 42};
    });

    expect(await fileService.getAll()).toStrictEqual({id: 42});
  });
});
