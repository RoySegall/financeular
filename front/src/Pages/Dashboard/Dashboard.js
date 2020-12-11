import React from 'react';
import "./Dashboard.scss"
import PageTitle from "../../Components/PageTitle/PageTitle";
import {useQuery} from "@apollo/client";
import {FILES} from "../../Apollo/Files";
import loadingImage from "./loading.svg";
import IllustrationWithMessage from "../../Components/IllustrationWithMessage/IllustrationWithMessage";
import {Link} from "react-router-dom";
import noFiles from "./noFiles.svg"
import {Redirect} from "react-router-dom";
import {SmallButton, Submit} from "../../Components/Buttons/Buttons";
import {UploadCloud} from "../../Components/Icons/Icons";
import CardTable from "../../Components/Table/CardTable";

export const DashboardFiles = ({loading, data}) => {

  if (loading) {
    return <IllustrationWithMessage
      message="Loading..."
      secondMessage="We are working on getting data from the server"
      image={loadingImage}
      imageAlt="Loading..."
    />
  }

  const {files} = data.me;

  if (files.length === 0) {
    return <IllustrationWithMessage
      message="No files were found...."
      secondMessage={<>We could not found files. You can <Link to="/upload">upload</Link> some files and get some interesting insights,
      maybe... We can't promise  any thing.</>}
      image={noFiles}
      imageAlt="No files were found"
    />
  }

  return <CardTable
    title={<div className="flex justify-between">
      <div>Uploaded files</div>
      <div>
        <Link to="/upload" className="no-underline"><SmallButton color='green'>Upload another file</SmallButton></Link>
      </div>
    </div>}
    headers={['File name', 'Created at', 'Actions']}
    rows={files.map(file => [file.name, file.created_at, <ul className="flex"><li className="pr-4">View</li> <li>Delete</li></ul>])}
  />
}

export default () => {
  const { loading, error, data } = useQuery(FILES, { errorPolicy: 'all' });

  if (error && error.graphQLErrors[0].message.includes('Unauthorized')) {
    // todo: handle it better.
    return <Redirect to="/" />
  }

  return <div className="files-wrapper pt-4 pl-4 pr-4">
    <DashboardFiles loading={loading} data={data} />
  </div>
}
