import {Next, Prev} from "../Icons/Icons";
import React from "react";

export default ({prevPageCallback, currentPage, numberOfPages, nextPageCallback}) => <span>
  <button onClick={prevPageCallback} className="pr-1 cursor-pointer underline"><Prev/></button>
  {currentPage + 1} of {numberOfPages}
  <button onClick={nextPageCallback} className="pl-1 cursor-pointer underline"><Next/></button>
</span>
