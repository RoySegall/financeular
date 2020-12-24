import React, {useState} from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import Loading from "../../Components/Loading/Loading";
import {useQuery} from "@apollo/client";
import {FILE} from "../../Apollo/Files";
import {Error} from "../../Components/Messages/Message";
import {useParams} from 'react-router-dom';
import CardTable from "../../Components/Table/CardTable";
import Card from "../../Components/Card/Card";
import {ErrorMark, Ok} from "../../Components/Icons/Icons";

const massageExtras = (extra, keys) => {
  const massagedObject = {};

  extra.map(extraFromFile => {
    const identifier = `${extraFromFile.month}_${extraFromFile.year}`;

    if (!Object.keys(massagedObject).includes(identifier)) {
      massagedObject[identifier] = [];
    }

    const objectToAppend = [];

    keys.map(key => {
      objectToAppend.push(extraFromFile[key])
    });

    massagedObject[identifier].push(objectToAppend);
  });

  return massagedObject;
}

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

  const expenses = massageExtras(file.expenses, ['title', 'value', 'date']);
  const incomes = massageExtras(file.incomes, ['title', 'value']);

  const selectedMonth = currentMonth || Object.keys(incomes)[0];

  const totalExpenses = Math.round(expenses[selectedMonth].reduce((accumulator, currentValue) => {
    return (Array.isArray(accumulator) ? accumulator[1] : accumulator) + currentValue[1];
  }));

  const totalIncomes = Math.floor(incomes[selectedMonth].reduce((accumulator, currentValue) => {
    return (Array.isArray(accumulator) ? accumulator[1] : accumulator) + currentValue[1];
  }));

  const isMonthOverDraft = totalExpenses > totalIncomes;
  const [infoBoxIcon, infoBoxColor, infoBoxTitle] = isMonthOverDraft ? [<ErrorMark />, 'red', 'Not seems so good'] : [<Ok />, 'green', 'You got it!'];
  const balance = totalIncomes - totalExpenses;

  return <div className="min-h-full w-full p-2 pb-0 flex flex-col content-between">
    <div className="flex justify-between items-center">
      <PageTitle align={'left'}>Results for the {selectedMonth}</PageTitle>
      <div>
        Viewing mode: <u>Balance</u>. Switch to view <u>Insights</u>
      </div>
    </div>

    <hr className="border-b border-green-dark mt-2"/>

      <section className="pt-4 flex">
        <div className="mr-10 w-3/6">
          <CardTable
            title="Incomes"
            headers={['Title', 'Value']}
            rows={incomes[selectedMonth]}
            perPage={5}>
          </CardTable>

          <div>
            <Card icon={infoBoxIcon}
                  iconType={infoBoxColor}
                  title={infoBoxTitle}
                  text={isMonthOverDraft ?
                    <>Not good 😓 All your income are summed to {totalIncomes} while the expenses are summed to {totalExpenses}. The total is {balance}</> :
                    <>On the right track! All your income are summed to {totalIncomes} while the expenses are summed to {totalExpenses}. The total is {balance}</>
                  }
                  className={"w-full"}/>
          </div>
        </div>

        <div className="w-3/6">
          <CardTable
            title="Expenses"
            headers={['Title', 'Value', 'Date']}
            rows={expenses[selectedMonth]}
            perPage={10}>

          </CardTable>
        </div>

      </section>

      <ul className="flex mt-auto w-full border border-yellow-600 bg-white rounded">
        {Object.keys(expenses).map((month, index) => {
          const selectedClass = month === selectedMonth ? 'bg-green-dark text-light-white' : '';
          return <li key={index} className={`p-2 ${selectedClass}`}>
            <a className={"cursor-pointer"} onClick={() => setCurrentMonth(month)}>{month}</a>
          </li>
        })}
      </ul>
  </div>

}