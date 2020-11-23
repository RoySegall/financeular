import {RowService} from './row.service';

describe('Testing the row service', () => {
  let rowService: RowService;
  let RowRepoMock;
  let findMock;

  beforeEach(() => {
    findMock = jest.fn();

    RowRepoMock = new (jest.fn(() => ({
      find: findMock,
    })))();

    rowService = new RowService(RowRepoMock);
  });

  it('Testing the getAll method', async () => {
    findMock.mockImplementation((args) => {
      expect(args).toStrictEqual({relations: ['category', 'file']})
      return {id: 42};
    });

    expect(await rowService.getAll()).toStrictEqual({id: 42});
  });
});
