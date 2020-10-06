import React from 'react';
import "./Dashboard.scss"
import PageTitle from "../../Components/PageTitle/PageTitle";
import NoFiles from "../../Components/NoFiles/NoFiles";

export default () => <div className="files-wrapper">
  <PageTitle align='left'>Your files</PageTitle>

  <NoFiles />
</div>
