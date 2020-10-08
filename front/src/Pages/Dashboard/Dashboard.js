import React from 'react';
import "./Dashboard.scss"
import PageTitle from "../../Components/PageTitle/PageTitle";
import NoFiles from "../../Components/NoFiles/NoFiles";
import {useQuery} from "@apollo/client";
import {FILES} from "../../Apollo/Files";
import loadingImage from "./loading.svg";

const DashboardFiles = ({loading, data}) => {

  if (loading) {
    return <img src={loadingImage} alt={"loading"} />
  }

  const {files} = data;

  if (files.length === 0) {
    return <NoFiles />;
  }

  return 'Files';
}

export default () => {
  const { loading, data } = useQuery(FILES);

  return <div className="files-wrapper">
    <PageTitle align='left'>Your files</PageTitle>
    <div>
      <DashboardFiles loading={loading} data={data} />
    </div>
  </div>
}
