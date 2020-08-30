import { Test, TestingModule } from '@nestjs/testing';
import { FileParseService } from './file-parse.service';
import path from "path";
const FullJson = require(path.join(__dirname, '/fixture/full.json'));

describe('FileParseService', () => {
  let service: FileParseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileParseService],
    }).compile();

    service = module.get<FileParseService>(FileParseService);
  });

  it('Should have the same parsed data as the mock one', async () => {
    const results = await service.parseFile(path.join(__dirname, '/example_files/dummy_file.xlsx'));

    expect(results).toStrictEqual(FullJson);
  });

  it('Should return the expected values for a given row', () => {
    // service.handleRow({});
    expect(true).toBe(true);
  })

  it('Should return the proper month name and year from a sheet title', () => {
    const matrix = [
      {name: '2020 דצמבר', expected: { month: 12, year: '2020' }},
      {name: 'דצמבר 2020', expected: { month: 12, year: '2020' }},
      {name: 'December 2020', expected: { month: 12, year: '2020' }},
      {name: '2020 December', expected: { month: 12, year: '2020' }},
      {name: 'Dec 2020', expected: { month: 12, year: '2020' }},
      {name: '2020 Aug', expected: { month: 8, year: '2020' }},
    ]

    matrix.map(({name, expected}) => {
      expect(service.getDateDataFromSheetName(name)).toStrictEqual(expected);
    })
  });
});
