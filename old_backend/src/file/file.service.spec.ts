import { FileService } from './file.service';
import {User} from "../user/user.entity";

describe('Testing the file service', () => {
  let fileService: FileService;
  let fileRepoMock;
  let findMock;
  let saveMock;

  beforeEach(() => {
    findMock = jest.fn();
    saveMock = jest.fn();

    fileRepoMock = new (jest.fn(() => ({
      find: findMock,
      save: saveMock,
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

  it('Testing the file upload handler', async () => {
    const mockOn = jest.fn().mockImplementation((args, cb) => {
      cb();
      return {'on': jest.fn()}
    });
    let mockCreateReadStream = jest.fn(() => ({
      pipe: jest.fn(() => ({
        on: mockOn
      })),
      on: mockOn
    }));

    const fileObject = {createReadStream: mockCreateReadStream, filename: 'dumm.xsl', mimetype: 'image/png'};
    const user = new User();

    // Testing a bad mimetype.
    let results = await fileService.saveFile(fileObject, user);

    expect(results).toStrictEqual({
      status: 'failed',
      message: 'The file is not a valid excel file',
      fileId: ''
    });

    // Testing a valid mimetype.
    fileObject.mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    process.env.UPLOAD_PATH = '/tmp';
    saveMock.mockImplementation((args) => {
      expect(Object.keys(args)).toStrictEqual(['name', 'path', 'user']);
      args.id = 42;
    })
    results = await fileService.saveFile(fileObject, user);
    expect(results).toStrictEqual({ status: 'success', message: 'The file has uploaded', fileId: 42 });
  });
});
