import React from 'react';
import {useQuery} from "@apollo/client";
import {FILES} from "../../Apollo/Files";
import {Redirect} from "react-router-dom";
import DashboardSideMenu from "../../Components/DashboardSideMenu";
import {DashboardFiles} from "../../Components/DashboardFiles/DashboardFiles";
import Loading from "../../Components/Loading/Loading";

export default () => {
  const { loading, error, data } = useQuery(FILES, { errorPolicy: 'all' });

  if (error && error.graphQLErrors[0].message.includes('Unauthorized')) {
    // todo: handle it better.
    return <Redirect to="/" />
  }

  if (loading) {
    return <Loading />;
  }

  return <div className="flex w-screen">
    <div className="bg-green-dark text-white w-2/12 pt-4 border-r border-yellow-600 shadow-lg pl-2">
      <DashboardSideMenu />
    </div>
    <div className="files-wrapper w-11/12 pt-4 pl-4 pr-4">
      <DashboardFiles loading={loading} data={data} />
    </div>
  </div>
}
