import React, {useEffect} from 'react';
import {logOut} from "../services/auth";
import {client} from "../client";
import {Redirect} from "react-router-dom"

export default () => {

  useEffect(() => {
    async function fetchData() {
      logOut();
      await client.resetStore();
    }
    fetchData();
  }, []);

  return <Redirect to="/" />;
}
