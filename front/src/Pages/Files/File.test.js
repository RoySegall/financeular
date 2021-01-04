import React from "react";
import {
  elementShouldContainText,
  mountComponent,
  sleep
} from "../../Tests/Utils";
import File from "./File";
import {FILE} from "../../Apollo/Files";
import {act} from "react-dom/test-utils";
import {cleanup} from "@testing-library/react";
import {
  calculateTotal,
  extractMetaDataFromFile, formatToCurrency, getBalanceMetaData,
  processFileRowsByKeys
} from "./File.service";
import {ErrorMark, Ok} from "../../Components/Icons/Icons";

jest.mock('react-router-dom');

describe('File service and component', () => {
  const mocks = [{
    request: {
      query: FILE,
      variables: {
        id: 1,
      },
    },

    result: {
      data: {
        file: {
          status: 'passed',
          expenses: [
            {
              month: 12,
              year: 2019,
              title: 'pizza',
              value: 60,
              date: '2019-01-12',
            },
            {
              month: 1,
              year: 2019,
              title: 'pizza',
              value: 60,
              date: '2019-01-12',
            }
          ],
          incomes: [
            {
              month: 12,
              year: 2019,
              title: 'paycheck',
              value: 6000,
            },
            {
              month: 1,
              year: 2019,
              title: 'paycheck',
              value: 6000,
            }
          ],
        }
      },
    },
  }];

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('Testing the component when a server returns an error - i.e no authorized', async () => {
    const mockWithError = [{
      request: mocks[0].request,
      error: new Error('Something went wrong'),
    }];

    const wrapper = mountComponent({component: <File fileId={1} />, mocks: mockWithError});

    // Waiting for getting error from the server for the
    await act(async () => await sleep(2000));

    // Updating the component again and verify we have the proper error.
    wrapper.update();
    elementShouldContainText(wrapper, 'Something went wrong while fetching the data. Please contact costumer success');
  });

  it('File service testing: processFileRowsByKeys', () => {

    expect(processFileRowsByKeys(mocks[0].result.data.file.expenses, ['title', 'value', 'date']))
      .toStrictEqual({"12_2019": [["pizza", 60, "2019-01-12"]], "1_2019": [["pizza", 60, "2019-01-12"]]});

    expect(processFileRowsByKeys(mocks[0].result.data.file.incomes, ['title', 'value']))
      .toStrictEqual( {"12_2019": [["paycheck", 6000]], "1_2019": [["paycheck", 6000]]});
  });

  it('File service testing: calculateTotal', () => {
    // Check expenses format.
    expect(calculateTotal([["pizza", 60, "2019-01-12"]])).toStrictEqual(60);
    expect(calculateTotal([["pizza", 60, "2019-01-12"], ["pizza", 60, "2019-01-12"]])).toStrictEqual(120);

    // Check incomes format.
    expect(calculateTotal([["pizza", 60]])).toStrictEqual(60);
    expect(calculateTotal([["pizza", 60], ["pizza", 60]])).toStrictEqual(120);
  });

  it('File service testing: extractMetaDataFromFile', () => {
    const metaData = extractMetaDataFromFile({file: mocks[0].result.data.file, currentMonth: '12_2019'});
    const expectedResults = {
      expenses: {"12_2019": [["pizza", 60, "2019-01-12"]], "1_2019": [["pizza", 60, "2019-01-12"]]},
      incomes: {"12_2019": [["paycheck", 6000]], "1_2019": [["paycheck", 6000]]},
      months: [ '12_2019', '1_2019' ],
      totalExpenses: 60,
      totalIncomes: 6000,
      isMonthOverDraft: false,
      balance: 5940,
      selectedMonth: '12_2019'
    };

    expect(metaData).toStrictEqual(expectedResults);
  });

  it('File service testing: getBalanceMetaData', () => {
    expect(getBalanceMetaData(true)).toStrictEqual([<ErrorMark />, 'red', 'Not seems so good']);
    expect(getBalanceMetaData(false)).toStrictEqual([<Ok />, 'green', 'You got it!']);
  });

  it('File service testing: formatToCurrency', () => {
    expect(formatToCurrency(100)).toBe("100");
    expect(formatToCurrency(1000)).toBe("1,000");
    expect(formatToCurrency(1590.06)).toBe("1,590.06");
  });

});
