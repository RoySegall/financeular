import IllustrationWithMessage from "../IllustrationWithMessage/IllustrationWithMessage";
import {Link} from "react-router-dom";
import noFiles from "../../Pages/Dashboard/noFiles.svg";
import CardTable from "../Table/CardTable";
import {SmallButton} from "../Buttons/Buttons";
import React from "react";

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
    rows={files.map(file => [
      file.name,
      file.created_at,
      <ul className="flex">
        <li className="pr-4"><Link to={`/dashboard/file/view/${file.id}`}>View</Link></li>
        <li>Delete</li>
      </ul>
    ])}
  />
}
