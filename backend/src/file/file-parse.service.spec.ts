import { Test, TestingModule } from '@nestjs/testing';
import { FileParseService } from './file-parse.service';

describe('FileParseService', () => {
  let service: FileParseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileParseService],
    }).compile();

    service = module.get<FileParseService>(FileParseService);
  });

  it('Should have the same parsed data as the mock one', () => {
    expect(1).toBe(2);
  });
});
