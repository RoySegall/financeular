import { FileService } from './file.service';

describe('Testing the file service', () => {
  let fileService: FileService;
  let RowRepoMock;
  let findMock;

  beforeEach(() => {
    findMock = jest.fn();

    RowRepoMock = new (jest.fn(() => ({
      find: findMock,
    })))();

    fileService = new FileService(RowRepoMock);
  });

  it('Testing the getAll method', async () => {
    findMock.mockImplementation((args) => {
      expect(args).toStrictEqual({relations: ['user', 'categories', 'rows']})
      return {id: 42};
    });

    expect(await fileService.getAll()).toStrictEqual({id: 42});
  });
});
