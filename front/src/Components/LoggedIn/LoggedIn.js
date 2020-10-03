import React from "react";
import {gql, useQuery} from "@apollo/client";
import {logOut} from "../../services/auth";

export const WHO_AM_I = gql`
  query {
    whoAmI {
      username
    }
  }
`;

export default () => {

  const { data } = useQuery(WHO_AM_I);

  if (!data) {
    return null;
  }

  return <div className="pr-5">
    Hello <b>{data.whoAmI.username}</b>. Click here to <a href='#' className="font-bold" onClick={logOut}>logout</a> or <b>View your uploaded files</b>
  </div>

}

