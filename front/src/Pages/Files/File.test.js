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
        dog: { id: '1', name: 'Buck', breed: 'bulldog' },
      },
    },
    // result: {
    //   file: {
    //     'pizza': 'a',
    //   },
    //   data: {
    //     file: {
    //       status: 'passed',
    //       expenses: [
    //         {
    //           month: 12,
    //           year: 2019,
    //           title: 'pizza',
    //           value: 60,
    //           data: '2019-01-12',
    //         }
    //       ],
    //       incomes: [
    //         {
    //           month: 12,
    //           year: 2019,
    //           title: 'paycheck',
    //           value: 6000,
    //         }
    //       ],
    //     }
    //   },
    // },
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

  it('File service testing: massageExtras', () => {
    expect(1).toBe(2);
  });

  it('File service testing: calculateTotal', () => {
    expect(1).toBe(2);
  });

  it('File service testing: extractMetaDataFromFile', () => {
    expect(1).toBe(2);
  });

  it('File service testing: getBalanceMetaData', () => {
    expect(1).toBe(2);
  });

  it('File service testing: formatToCurrency', () => {
    expect(1).toBe(2);
  });

});
