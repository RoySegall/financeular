import { CategoryService } from './category.service';

describe('Testing the category service', () => {
  let categoryService: CategoryService;
  let categoryMockRepo;
  let findMock;

  beforeEach(() => {
    findMock = jest.fn();

    categoryMockRepo = new (jest.fn(() => ({
      find: findMock,
    })))();

    categoryService = new CategoryService(categoryMockRepo);
  });

  it('Testing the getAll method', async () => {
    findMock.mockImplementation((args) => {
      expect(args).toStrictEqual({relations: ['file', 'rows']})
      return {id: 42};
    });

    expect(await categoryService.getAll()).toStrictEqual({id: 42});
  });
});
