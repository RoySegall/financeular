import CardTable from "../../Components/Table/CardTable";
import Card from "../../Components/Card/Card";
import React from "react";
import {formatToCurrency} from "./File.service";


//todo: work on the balancer design, look and feel.
export default ({
  incomes, expenses, selectedMonth, totalIncomes, totalExpenses,
  infoBoxIcon, infoBoxColor, infoBoxTitle,
  isMonthOverDraft, balance,
  incomeCurrentPage, setIncomeCurrentPage, expensesCurrentPage, setExpensesCurrentPage
}) => <section className="pt-4 flex">
  <div className="mr-10 w-3/6">

    <CardTable
      title="Incomes"
      headers={['Title', 'Value']}
      rows={incomes[selectedMonth]}
      perPage={5}
      currentPage={incomeCurrentPage}
      setCurrentPage={setIncomeCurrentPage} />

    <div>
      <Card
        icon={infoBoxIcon}
        iconType={infoBoxColor}
        title={infoBoxTitle}
        className={"w-full"}
        text={
          <>
            <p>
              All your income(s) are summed to <b>{formatToCurrency(totalIncomes)}</b> while the
              expenses are summed to <b>{formatToCurrency(totalExpenses)}</b>.
            </p>
            <p>
              The balance stands on <b>{formatToCurrency(balance)}</b>.
            </p>
          </>} />
    </div>
  </div>

  <div className="w-3/6">
    <CardTable
      title="Expenses"
      headers={['Title', 'Value', 'Date']}
      rows={expenses[selectedMonth]}
      perPage={10}
      currentPage={expensesCurrentPage}
      setCurrentPage={setExpensesCurrentPage} />
  </div>

</section>