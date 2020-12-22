import React, {useState} from "react";
import results from './results.json';
import PageTitle from "../../Components/PageTitle/PageTitle";
import Loading from "../../Components/Loading/Loading";
import {useQuery} from "@apollo/client";
import {FILE} from "../../Apollo/Files";
import {Error, Info} from "../../Components/Messages/Message";
import {useParams} from 'react-router-dom';
import CardTable from "../../Components/Table/CardTable";

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
          rows={[
            ['a', 'b'],
            ['a', 'b'],
            ['a', 'b'],
          ]}>
        </CardTable>
      </div>

      <div className="w-3/6">
        <CardTable
          title="Expenses"
          headers={['Title', 'Value', 'Date']}
          rows={[
            ['a', 'b'],
            ['a', 'b'],
            ['a', 'b'],
            ['a', 'b'],
            ['a', 'b'],
            ['a', 'b'],
          ]}>

        </CardTable>
      </div>

    </section>
  </div>

}