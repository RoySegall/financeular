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

    expect(results).toEqual(FullJson);
  });

  it('Should return the expected values for a given row', () => {
    const rows = [
      {
        input: ["כמה ציפינו להוציא", 9030, "צפי הוצאות", 10000, "משכורת", 1600, 400, 2.5, "כל שבוע עד 400 שקל סופר", 4, "סופר", null, null, null],
        results: {
          "limitation": {
            "total_value": 1600,
            "value_per_week": 400,
            "description": "כל שבוע עד 400 שקל סופר",
            "time_per_month": "כל שבוע עד 400 שקל סופר",
            "title": "כל שבוע עד 400 שקל סופר"
          },
          "income": {
            "title": "משכורת",
            "value": 10000
          },
          "expense": undefined,
        }
      },
      {
        input: ["כמה ציפינו שישאר", 3170, "צפי שארית", 1200, "עזרה מאמא", 400, 100, 3.5, "כל שבוע מזמינים בחוץ עד 100 שקל", 4, "מזמינים אוכל", -1255.06, 43477, "כסף מפייפל"],
        results: {
          "limitation": {
            "total_value": 400,
            "value_per_week": 100,
            "description": "כל שבוע מזמינים בחוץ עד 100 שקל",
            "time_per_month": "כל שבוע מזמינים בחוץ עד 100 שקל",
            "title": "כל שבוע מזמינים בחוץ עד 100 שקל"
          },
          "income": {
            "title": "עזרה מאמא",
            "value": 1200
          },
          "expense": {
            "value": -1255.06,
            "date": 43477,
            "title": "כסף מפייפל",
          }
        },
      },
    ];

    rows.map(({input, results}) => {
      expect(service.handleRow(input)).toStrictEqual(results);
    });

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
