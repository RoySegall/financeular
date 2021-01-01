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
import FileBalance from "./FileBalance";
import MonthsPicker from "./MonthsPicker";
import Card from "../../Components/Card/Card";

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

  return <div className="min-h-full w-full p-2 pb-0 flex flex-col content-between">
    <Header selectedMonth={selectedMonth} borderColor={borderColor} />

    <div className={`flex flex-col rounded rounded-xl rounded-tr-none bg-white border border-${borderColor}-300 pt-4 h-4/5`}>

      <section id="upper-wrapper" className="flex flex-row justify-between">
        <section id="balance-intro" className="pl-2 flex items-center">

          <div className="icon pr-2">
            <div className={`m-auto m-0 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-2xl bg-${infoBoxColor}-400 text-white`}>
              {infoBoxIcon}
            </div>
          </div>
          <div className="icon text-xl font-bold align-center">
            The balance for the current month is <b>{formatToCurrency(balance)}</b>.
          </div>
        </section>

        <section id="balance-info" className="pr-2">
          asdasd
        </section>

      </section>


      <MonthsPicker {...{months, selectedMonth, setCurrentMonth, setIncomeCurrentPage, setExpensesCurrentPage}} />
    </div>
  </div>

  // return <div className="min-h-full w-full p-2 pb-0 flex flex-col content-between">
  //   <Header selectedMonth={selectedMonth} />
  //
  //   <hr className="border-b border-green-dark mt-2"/>
  //
  //   <FileBalance {...{
  //     incomes: incomes[selectedMonth], expenses: expenses[selectedMonth], infoBoxIcon, infoBoxColor, infoBoxTitle,
  //     totalIncomes, totalExpenses, balance, incomeCurrentPage,
  //     setIncomeCurrentPage, expensesCurrentPage, setExpensesCurrentPage
  //   }}/>
  //
  //
  // </div>
}