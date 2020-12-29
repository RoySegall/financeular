import renderer from "react-test-renderer";
import React from "react";
import FileBalance from "./FileBalance";

describe('File balance component', () => {

  it('Validate the content for over draft', () => {
    const incomes = [
      ['income', 1200],
      ['income', 1200],
      ['income', 1200],
      ['income', 1200],
      ['income', 1200],
      ['income', 1200],
      ['income', 1200],
      ['income', 1200],
    ];
    const expenses = [
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
      ['expense', 1200, '01-02-1990'],
    ];

    const tree = renderer
      .create(<FileBalance {...{
        incomes, expenses,
        infoBoxIcon: <>Box icon</>,
        infoBoxColor: 'green',
        infoBoxTitle: 'awesome',
        totalIncomes: 1234,
        totalExpenses: 5678,
        balance: 9000,
        incomeCurrentPage: 0,
        setIncomeCurrentPage: () => {},
        expensesCurrentPage: () => {},
        setExpensesCurrentPage: () => {},
      }}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});