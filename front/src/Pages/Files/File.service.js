import {ErrorMark, Ok} from "../../Components/Icons/Icons";
import React from "react";

export const massageExtras = (extra, keys) => {
  const massagedObject = {};

  extra.map(extraFromFile => {
    const identifier = `${extraFromFile.month}_${extraFromFile.year}`;

    if (!Object.keys(massagedObject).includes(identifier)) {
      massagedObject[identifier] = [];
    }

    const objectToAppend = [];

    keys.map(key => {
      objectToAppend.push(extraFromFile[key])
    });

    massagedObject[identifier].push(objectToAppend);
  });

  return massagedObject;
}

export const extractMetaDataFromFile = ({file, currentMonth}) => {
  const expenses = massageExtras(file.expenses, ['title', 'value', 'date']);
  const incomes = massageExtras(file.incomes, ['title', 'value']);
  const months = Object.keys(incomes);

  const selectedMonth = currentMonth || months[0];

  const totalExpenses = Math.round(expenses[selectedMonth].reduce((accumulator, currentValue) => {
    return (Array.isArray(accumulator) ? accumulator[1] : accumulator) + currentValue[1];
  }));

  const totalIncomes = Math.floor(incomes[selectedMonth].reduce((accumulator, currentValue) => {
    return (Array.isArray(accumulator) ? accumulator[1] : accumulator) + currentValue[1];
  }));

  const isMonthOverDraft = totalExpenses > totalIncomes;
  const balance = totalIncomes - totalExpenses;

  return {
    expenses,
    incomes,
    months,
    totalExpenses,
    totalIncomes,
    isMonthOverDraft,
    balance,
    selectedMonth,
  };
};

export const getBalanceMetaData = (isMonthOverDraft) => {
  return isMonthOverDraft ?
    [<ErrorMark />, 'red', 'Not seems so good'] :
    [<Ok />, 'green', 'You got it!'];
};

export const getMonthAndYearFromKey = (monthKeyYear) => {
  const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  const [month, year] = monthKeyYear.split('_');

  return `${months[month]} ${year}`;
};
