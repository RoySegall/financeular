import PageTitle from "../../Components/PageTitle/PageTitle";
import {getMonthAndYearFromKey} from "./File.service";
import React from "react";

export default ({selectedMonth, borderColor = 'green'}) => {

  return <div className="flex justify-between items-center">
    <div className="pb-3">
      <PageTitle align={'left'}>{getMonthAndYearFromKey(selectedMonth)}</PageTitle>
    </div>
    <ul className="flex overlap-tabs">
      <li className={`pr-2 text-xl font-bold bg-gray-100 p-3 rounded-tl-lg border border-b-0 border-${borderColor}-300`}>Insights</li>
      <li className={`text-xl font-bold bg-white p-3 rounded-tr-lg border border-l-0 border-b-0 border-${borderColor}-300`}>Balance</li>
    </ul>
  </div>
}