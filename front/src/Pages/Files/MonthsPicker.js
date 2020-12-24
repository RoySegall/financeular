import {getMonthAndYearFromKey} from "./File.service";
import React from "react";

export default ({months, selectedMonth, setCurrentMonth}) => <ul className="flex mt-auto w-full border border-yellow-600 mb-2 bg-white rounded">
  {months.map((month, index) => {
    const selectedClass = month === selectedMonth ? 'bg-green-dark text-light-white' : '';
    return <li key={index} className={`p-2 ${selectedClass}`}>
      <a className={"cursor-pointer"} onClick={() => setCurrentMonth(month)}>{getMonthAndYearFromKey(month)}</a>
    </li>
  })}
</ul>