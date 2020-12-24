import Pager from "./Pager";
import React from "react";

export default ({title, actions=null, showPager, currentPage, numberOfPages, setCurrentPage}) => <div className="rounded-t mb-0 px-4 py-3 border-0">
  <div className="flex flex-wrap items-center">
    <div className="relative w-full px-4 max-w-full flex-grow flex text-left flex justify-between">
      <h3 className={"font-semibold text-lg text-gray-800"}>{title}</h3>
      {actions}

      {showPager && <Pager
        prevPageCallback={() => {currentPage > 0 && setCurrentPage(currentPage - 1)}}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onClick1={() => {currentPage + 1 < numberOfPages && setCurrentPage(currentPage + 1)}
        }/>}
    </div>
  </div>
</div>
