import {getMonthAndYearFromKey} from "./File.service";
import React from "react";

export default ({months, selectedMonth, setCurrentMonth, setIncomeCurrentPage, setExpensesCurrentPage}) => <ul className="flex mt-auto w-full ">
  {months.map((month, index) => {
    const selectedClass = month === selectedMonth ? 'font-extrabold text-black' : '';
    return <li key={index} className={`p-2 ${selectedClass}`}>
      <a className={"cursor-pointer"} onClick={() => { setCurrentMonth(month); setIncomeCurrentPage(0); setExpensesCurrentPage(0); }}>{getMonthAndYearFromKey(month)}</a>
    </li>
  })}
</ul>