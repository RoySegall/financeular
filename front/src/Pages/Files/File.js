import React, {useState} from "react";
import Loading from "../../Components/Loading/Loading";
import {useQuery} from "@apollo/client";
import {FILE} from "../../Apollo/Files";
import {Error} from "../../Components/Messages/Message";
import {useParams} from 'react-router-dom';
import {
  extractMetaDataFromFile,
  formatToCurrency,
  getBalanceMetaData
} from "./File.service";
import Header from "./Header";
import MonthsPicker from "./MonthsPicker";
import {InfoMark, Next, Prev} from "../../Components/Icons/Icons";

export default ({fileId}) => {

  if (!fileId) {
    const {id} = useParams();

    fileId = id;
  }

  const {loading, error, data} = useQuery(FILE, {
    errorPolicy: 'all',
    variables: {id: fileId}
  });

  const [showError, setShowError] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(null);

  const [infoMode, setInfoMode] = useState('expenses');

  const [incomeCurrentPage, setIncomeCurrentPage] = useState(0);
  const [expensesCurrentPage, setExpensesCurrentPage] = useState(0);

  if (loading) {
    return <Loading/>;
  }

  if (error || showError) {
    return <div className=" flex justify-center items-center">
      <div className="m-auto">
        <Error message="Something went wrong while fetching the data. Please contact costumer success"/>
      </div>
    </div>
  }

  const {file} = data;

  if (file.status === "ERROR") {
    setShowError(true);
  }

  const {
    expenses, incomes, months, totalExpenses, totalIncomes, isMonthOverDraft,
    balance, selectedMonth
  } = extractMetaDataFromFile({file, currentMonth});
  const [infoBoxIcon, infoBoxColor, infoBoxTitle] = getBalanceMetaData(isMonthOverDraft);

  const borderColor = isMonthOverDraft ? "red" : "green";

  const width = Math.round((totalExpenses / totalIncomes) * 100);

  let tableHeaders = [];
  let tableTdWidth = '';

  if (infoMode === 'expenses') {
    tableHeaders = [
      'Title',
      'Value',
      'Date',
      'Category',
      <><input placeholder="Filter expenses by typing" className="w-full rounded border border-green-500 bg-green-50 text-green-700 py-1 pl-2 ml-1 focus:outline-none" /></>
    ];
    tableTdWidth = "w-1/4";
  } else {

  }

  return <div className="min-h-full w-full p-2 pb-0 flex flex-col content-between">
    <Header selectedMonth={selectedMonth} borderColor={borderColor} />

    <div className={`flex flex-col rounded rounded-xl rounded-tr-none bg-white border border-${borderColor}-300 pt-4 h-full mb-4`}>

      <section id="upper-wrapper" className="flex flex-row justify-between">
        <section id="balance-intro" className="pl-2 flex items-center">

          <div className="icon pr-2">
            <div className={`m-auto m-0 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-2xl bg-${infoBoxColor}-400 text-white`}>
              {infoBoxIcon}
            </div>
          </div>
          <div className="icon align-center">
            <p className="text-xl font-bold ">{infoBoxTitle}</p>
            <p>
              The balance for the current month is <b>{formatToCurrency(balance)}</b>.
            </p>
          </div>
        </section>

        <section id="balance-info" className="pr-2 flex flex-col">

          <div className="flex">
            <div className="text-red-300">
              <span className="text-xl font-bold block"><a className="font-bold">Expenses</a></span>
              <span>{formatToCurrency(totalExpenses)}</span>
            </div>

            <div className="pl-8 text-green-500">
              <span className="text-xl block"><a>Incomes</a></span>
              <span>{formatToCurrency(totalIncomes)}</span>
            </div>
          </div>

          <div className="relative w-full" style={{maxWidth: '200px'}}>
            <div className="m-0 m-auto mt-2 h-6 w-full bg-green-200 rounded">
              &nbsp;
            </div>

            <div className="absolute top-0 m-0 m-auto mt-2 h-6 bg-red-200 rounded text-red-700 font-bold text-center" style={{width: (width * 2) + 'px', maxWidth: '210px'}}>
              {width}%
            </div>
          </div>

        </section>

      </section>

      <section id="data-wrapper" className="pl-2 pr-2 pt-10">
        <table className="w-full">

          <thead>
            {tableHeaders.map((tableHeader, key) => <th
              className={"text-left font-semibold uppercase py-3 px-2 border border-solid border-l-0 border-r-0 border-gray-200 bg-gray-100 text-gray-600"} key={key}>
              {tableHeader}
            </th>)}
          </thead>

          <tbody>

            {expenses[selectedMonth].slice(0, 14).map((expense, key) => {
              return <tr className="text-black border-b border-gray-300" key={key}>

                {expense.map((expense, tdKey) => {
                  return <td className={`px-2 ${tableTdWidth} pt-2`} key={tdKey}>{expense}</td>
                })}

                <td colSpan={2}><p className="bg-green-100 p-2 border border-green-900 w-min text-black my-2 font-light text-xs rounded">Category</p></td>
              </tr>
            })}

            <tr>

              <td colspan={5} className="pr-2 pt-4">
                <ul className="flex float-right">
                  <li className="p-2 border border-blue-400 border-r-0 text-black rounded-l-lg"><Prev /></li>
                  <li className="p-2 border border-blue-400 border-r-0 text-black">1</li>
                  <li className="p-2 border border-blue-400 border-r-0 text-black">2</li>
                  <li className="p-2 border border-blue-400 border-r-0 text-black">3</li>
                  <li className="p-2 border border-blue-400 text-black rounded-r-lg"><Next /></li>
                </ul>
              </td>
            </tr>

          </tbody>
        </table>
      </section>

      <MonthsPicker {...{months, selectedMonth, setCurrentMonth, setIncomeCurrentPage, setExpensesCurrentPage}} />
    </div>
  </div>
}