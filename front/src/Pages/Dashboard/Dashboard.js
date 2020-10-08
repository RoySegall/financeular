import React from 'react';
import "./Dashboard.scss"
import PageTitle from "../../Components/PageTitle/PageTitle";
import {useQuery} from "@apollo/client";
import {FILES} from "../../Apollo/Files";
import loadingImage from "./loading.svg";
import IllustrationWithMessage from "../../Components/IllustrationWithMessage/IllustrationWithMessage";
import {Link} from "react-router-dom";
import noFiles from "./noFiles.svg"
import FilesTable from "../../Components/FilesTable/FilesTable";

const DashboardFiles = ({loading, data}) => {

  if (loading) {
    return <IllustrationWithMessage
      message="Loading..."
      secondMessage="We are working on getting data from the server"
      image={loadingImage}
      imageAlt="Loading..."
    />
  }

  const {files} = data;

  if (files.length === 0) {
    return <IllustrationWithMessage
      message="No files were found...."
      secondMessage={<>We could not found files. You can <Link to="/upload">upload</Link> some files and get some interesting insights,
      maybe... We can't promise  any thing.</>}
      image={noFiles}
      imageAlt="No files were found"
    />
  }

  return <div>
    <div className="text-right pr-16">Upload button</div>
    <FilesTable />
  </div>
}

export default () => {
  const { loading, data } = useQuery(FILES);

  return <div className="files-wrapper">
    <PageTitle align='left'>Your files</PageTitle>
    <DashboardFiles loading={loading} data={data} />
  </div>
}
