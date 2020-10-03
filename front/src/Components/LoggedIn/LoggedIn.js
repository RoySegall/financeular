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
  const { loading, error, data } = useQuery(WHO_AM_I, { errorPolicy: 'all' });

  if (loading) {
    return null;
  }

  if (!data) {
    return null;
  }

  return <div className="pr-5">
    Hello <b>{data.whoAmI.username}</b>. Click here to <Link to="/logout" className="font-bold" onClick={logOut}>logout</Link> or <b>View your uploaded files</b>
  </div>
}
