import CardTable from "../../Components/Table/CardTable";
import Card from "../../Components/Card/Card";
import React from "react";

export default (
  {incomes, expenses, selectedMonth, infoBoxIcon, infoBoxColor, infoBoxTitle, isMonthOverDraft, totalIncomes, totalExpenses, balance}
) => <section className="pt-4 flex">
  <div className="mr-10 w-3/6">

    <CardTable title="Incomes" headers={['Title', 'Value']} rows={incomes[selectedMonth]} perPage={5} />

    <div>
      <Card
        icon={infoBoxIcon}
        iconType={infoBoxColor}
        title={infoBoxTitle}
        className={"w-full"}
        text={isMonthOverDraft ?
          <>Not good 😓 All your income are summed to {totalIncomes} while the expenses are summed to {totalExpenses}. The total is {balance}</> :
          <>On the right track! All your income are summed to {totalIncomes} while the expenses are summed to {totalExpenses}. The total is {balance}</>
        } />
    </div>
  </div>

  <div className="w-3/6">
    <CardTable
      title="Expenses"
      headers={['Title', 'Value', 'Date']}
      rows={expenses[selectedMonth]}
      perPage={10} />
  </div>

</section>