import React from 'react';
import {useQuery} from "@apollo/client";
import {FILES} from "../../Apollo/Files";
import loadingImage from "./loading.svg";
import IllustrationWithMessage from "../../Components/IllustrationWithMessage/IllustrationWithMessage";
import {Redirect} from "react-router-dom";
import DashboardSideMenu from "../../Components/DashboardSideMenu";
import {DashboardFiles} from "../../Components/DashboardFiles/DashboardFiles";

export default () => {
  const { loading, error, data } = useQuery(FILES, { errorPolicy: 'all' });

  if (error && error.graphQLErrors[0].message.includes('Unauthorized')) {
    // todo: handle it better.
    return <Redirect to="/" />
  }

  if (loading) {
    return <div className="w-screen text-center">
      <IllustrationWithMessage
        message="Loading..."
        secondMessage="We are working on getting data from the server"
        image={loadingImage}
        imageAlt="Loading..."
      />
    </div>
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
