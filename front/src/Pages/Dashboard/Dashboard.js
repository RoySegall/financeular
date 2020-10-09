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
import {Redirect} from "react-router-dom";
import {Submit} from "../../Components/Buttons/Buttons";
import {UploadCloud} from "../../Components/Icons/Icons";

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

  return <div className="files mr-5">
    <FilesTable files={files} />
  </div>
}

export default () => {
  const { loading, error, data } = useQuery(FILES, { errorPolicy: 'all' });

  if (error && error.graphQLErrors[0].message.includes('Unauthorized')) {
    // todo: handle it better.
    return <Redirect to="/" />
  }

  return <div className="files-wrapper">
    <div className="flex items-center mr-5 pb-5">
      <PageTitle align='left'>Your files</PageTitle>
      <div className="ml-auto">
        <Link to="/upload" className="no-underline">
          <Submit><UploadCloud /> Upload another file</Submit>
        </Link>
      </div>
    </div>
    <DashboardFiles loading={loading} data={data} />
  </div>
}
