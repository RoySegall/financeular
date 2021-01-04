import {formatToCurrency} from "./File.service";
import React from "react";

export default ({infoBoxTitle, infoBoxColor, infoBoxIcon, balance, setInfoMode, totalExpenses, totalIncomes, width}) => <section id="upper-wrapper" className="flex flex-row justify-between">
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
        <span className="text-xl font-bold block"><button className="font-bold underline pointer-cursor" onClick={() => setInfoMode('expenses')}>Expenses</button></span>
        <span>{formatToCurrency(totalExpenses)}</span>
      </div>

      <div className="pl-8 text-green-500">
        <span className="text-xl block"><button className='font-bold underline pointer-cursor' onClick={() => setInfoMode('incomes')}>Incomes</button></span>
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
