import React, {useEffect, useState} from "react";
import results from './results.json';
import PageTitle from "../../Components/PageTitle/PageTitle";
import {Calculator, Expenses, Income} from "../../Components/Icons/Icons";
import Table from "../../Components/Table/Table";
import Notes from "../../Components/Notes/Notes";
import Bar from "../../Components/Graphs/Bar";
import Pie from "../../Components/Graphs/Pie";
import Loading from "../../Components/Loading/Loading";
import {useMutation, useQuery} from "@apollo/client";
import {FILE, PROCESS_FILE} from "../../Apollo/Files";
import {Error} from "../../Components/Messages/Message";

export default () => {

  // todo: get the id from the routes.
  const id = 1;

  const {loading, error, data} = useQuery(FILE, {errorPolicy: 'all', variables: {id: id}});
  const [processFile] = useMutation(PROCESS_FILE, {errorPolicy: 'all', variables: {id: id}});

  const [file, setFile] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {

    (async function anyNameFunction() {
      const {errors, data} = await processFile();

      if (errors) {
        setShowLoading(false);
        setShowError(true);
        return
      }

      setShowLoading(true);

    })();
    }, []);

  if (showLoading) {
    return <Loading/>;
  }

  if (showError) {
    return <Error message="Something went wrong while fetching the data. Please contact costume success"/>
  }

  const currentMonth = "08";

  return <div className="pl-5 pr-5">
    <PageTitle align={'left'}>Results for the month 12/2019</PageTitle>

    <div className="grid grid-cols-12 h-screen pt-4">
      <div className="col-span-2 pb-10 pr-5">
        <h2 className="text-2xl font-bold pb-4"><Income/> Income</h2>
        <Table data={results.months[currentMonth].income}/>
      </div>
      <div className="col-span-4 pb-10 pl-5">
        <h2 className="text-2xl font-bold pb-4"><Expenses/> Expenses</h2>
        <Table data={results.months[currentMonth].expenses}/>
      </div>
      <div className="col-span-6 pb-10 pl-5">
        <h2 className="text-2xl font-bold pb-4"><Calculator/> Limitations</h2>
        <Table data={results.limitations}/>
      </div>
      <div className="col-span-12 pl-2"><Notes/></div>

      <div className="col-span-9 bar-height"><Bar data={results.charts.bars}/>
      </div>
      <div className="col-span-3 bar-height"><Pie data={results.charts.pie}/>
      </div>
    </div>
  </div>
}