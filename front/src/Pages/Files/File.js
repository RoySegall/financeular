import React, {useState} from "react";
import Loading from "../../Components/Loading/Loading";
import {useQuery} from "@apollo/client";
import {FILE} from "../../Apollo/Files";
import {Error} from "../../Components/Messages/Message";
import {useParams} from 'react-router-dom';
import {extractMetaDataFromFile, getBalanceMetaData} from "./File.service";
import Header from "./Header";
import MonthsPicker from "./MonthsPicker";
import UpperSection from "./UpperSection";
import Table from "./Table";

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
  const [currentPage, setCurrentPage] = useState(0);

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
    tableHeaders = [
      'Title',
      'Value',
    ];
    tableTdWidth = "w-1/2";
  }

  return <div className="min-h-full w-full p-2 pb-0 flex flex-col content-between">
    <div className="ml-4"><Header selectedMonth={selectedMonth} borderColor={borderColor} /></div>

    <div className={`flex flex-col rounded rounded-xl rounded-tr-none bg-white border border-${borderColor}-300 pt-4 h-full mb-4`}>

      <UpperSection {...{infoBoxTitle, infoBoxColor, infoBoxIcon, balance, setInfoMode, totalExpenses, totalIncomes, width}} />

      <section id="data-wrapper" className="pl-2 pr-2 pt-10">

        <Table
          tableHeaders={tableHeaders}
          borderColor={borderColor}
          infoMode={infoMode}
          rows={infoMode === 'expenses' ? expenses[selectedMonth] : incomes[selectedMonth]}
          tableTdWidth={tableTdWidth}
          perPage={infoMode === 'expenses' ? 14 : 5}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />

      </section>

      <MonthsPicker {...{months, selectedMonth, setCurrentMonth, setCurrentPage, setInfoMode}} />
    </div>
  </div>
}
