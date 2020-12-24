import PageTitle from "../../Components/PageTitle/PageTitle";
import {getMonthAndYearFromKey} from "./File.service";
import React from "react";

export default ({selectedMonth}) => <div className="flex justify-between items-center">
  <PageTitle align={'left'}>Results for the {getMonthAndYearFromKey(selectedMonth)}</PageTitle>
  <div>
    Viewing mode: <u>Balance</u>. Switch to view <u>Insights</u>
  </div>
</div>