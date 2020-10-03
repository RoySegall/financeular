import React from "react";
import {gql, useQuery} from "@apollo/client";

export const GET_CART_ITEMS = gql`
  query {
    whoAmI {
      username
    }
  }
`;

export default () => {

  const { data } = useQuery(GET_CART_ITEMS);

  if (!data) {
    return null;
  }

  return <div className="pr-5">
    Hello <b>{data.whoAmI.username}</b>
  </div>

}

