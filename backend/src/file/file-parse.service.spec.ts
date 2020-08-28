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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
