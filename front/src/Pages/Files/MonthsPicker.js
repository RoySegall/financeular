import {getMonthAndYearFromKey} from "./File.service";
import React from "react";

export default ({months, selectedMonth, setCurrentMonth, setCurrentPage, setInfoMode}) => <ul className="flex mt-auto w-full ">
  {months.map((month, index) => {
    const selectedClass = month === selectedMonth ? 'font-extrabold text-black' : '';
    return <li key={index} className={`p-2 ${selectedClass}`}>
      <a className={"cursor-pointer"} onClick={() => { setCurrentMonth(month); setCurrentPage(0); setInfoMode('expenses') }}>{getMonthAndYearFromKey(month)}</a>
    </li>
  })}
</ul>
