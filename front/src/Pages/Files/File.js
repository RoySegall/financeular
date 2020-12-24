import React, {useState} from "react";
import Loading from "../../Components/Loading/Loading";
import {useQuery} from "@apollo/client";
import {FILE} from "../../Apollo/Files";
import {Error} from "../../Components/Messages/Message";
import {useParams} from 'react-router-dom';
import {extractMetaDataFromFile, getBalanceMetaData} from "./File.service";
import Header from "./Header";
import FileBalance from "./FileBalance";
import MonthsPicker from "./MonthsPicker";


// todo: fix june and july, when going between months the table need reset.
export default () => {

  const {id} = useParams();

  const {loading, error, data} = useQuery(FILE, {
    errorPolicy: 'all',
    variables: {id: id}
  });

  const [showError, setShowError] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(null);

  if (loading) {
    return <Loading/>;
  }

  if (error || showError) {
    return <Error
      message="Something went wrong while fetching the data. Please contact costume success"/>
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

  return <div className="min-h-full w-full p-2 pb-0 flex flex-col content-between">
    <Header selectedMonth={selectedMonth} />

    <hr className="border-b border-green-dark mt-2"/>

    <FileBalance {...{
      incomes, expenses, selectedMonth, infoBoxIcon, infoBoxColor, infoBoxTitle,
      isMonthOverDraft, totalIncomes, totalExpenses, balance
    }}/>

    <MonthsPicker {...{months, selectedMonth, setCurrentMonth}} />
  </div>
}