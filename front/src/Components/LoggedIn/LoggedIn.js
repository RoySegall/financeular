import React from "react";
import {gql, useQuery} from "@apollo/client";
import {logOut} from "../../services/auth";
import {Link} from "react-router-dom";

export const WHO_AM_I = gql`
  query {
    whoAmI {
      username
    }
  }
`;

export default () => {
  const { loading, data } = useQuery(WHO_AM_I, { errorPolicy: 'all' });

  if (loading) {
    return null;
  }

  if (!data) {
    return <div className="pr-5">
      Welcome <b>Guest</b>. Click here to <Link to="/login" className="font-bold" onClick={logOut}>login</Link>
    </div>
  }

  return <div className="pr-5">
    Hello <b>{data.whoAmI.username}</b>. Click here to&nbsp;
    <Link to="/logout" className="font-bold" onClick={logOut}>logout</Link> or&nbsp;
    <Link to="/dashboard" className="font-bold">View your uploaded files</Link>
  </div>
}
