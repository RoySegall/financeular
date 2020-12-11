import React from 'react';
import {useQuery} from "@apollo/client";
import {FILES} from "../../Apollo/Files";
import loadingImage from "./loading.svg";
import IllustrationWithMessage from "../../Components/IllustrationWithMessage/IllustrationWithMessage";
import {Link} from "react-router-dom";
import noFiles from "./noFiles.svg"
import {Redirect} from "react-router-dom";
import {SmallButton} from "../../Components/Buttons/Buttons";
import CardTable from "../../Components/Table/CardTable";
import {Error} from "../../Components/Messages/Message";

export const DashboardFiles = ({data}) => {

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

  return <>
    <Error message={"There was an error. You not hungry enough! 🍕"} />
  </>

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
    <div className="pl-4">
      asdasd
    </div>
    <div className="files-wrapper w-full pt-4 pl-4 pr-4">
      <DashboardFiles loading={loading} data={data} />
    </div>
  </div>
}
