import React, {useState} from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import Loading from "../../Components/Loading/Loading";
import {useQuery} from "@apollo/client";
import {FILE} from "../../Apollo/Files";
import {Error} from "../../Components/Messages/Message";
import {useParams} from 'react-router-dom';
import CardTable from "../../Components/Table/CardTable";

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

  // todo: add page, get the first month from the key, add aviagation.
  return <div className="min-h-full w-full m-4 mb-6 p-4">
    <div className="flex justify-between items-center">
      <PageTitle align={'left'}>Results for the 12/2019</PageTitle>
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
          rows={incomes['12_2019']}>
        </CardTable>
      </div>

      <div className="w-3/6">
        <CardTable
          title="Expenses"
          headers={['Title', 'Value', 'Date']}
          rows={expenses['12_2019'].slice(0, 10)}>

        </CardTable>
      </div>

    </section>
  </div>

}