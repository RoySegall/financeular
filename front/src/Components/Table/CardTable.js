import React, {useState} from "react";
import Table from "./Table";
import TopPart from "./TopPart";

export default function CardTable({ title, headers, rows, className, perPage, actions = null }) {
  const showPager = rows.length > perPage;
  const [currentPage, setCurrentPage] = useState(0);

  let numberOfPages = null;

  if (showPager) {
    numberOfPages = Math.ceil(rows.length / perPage);
  }

  const rowsToDisplay = !showPager ? rows : rows.slice(perPage*currentPage, perPage * (currentPage + 1));

  return <div className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ${className}`}>
    <TopPart title={title} actions={actions} showPager={showPager} currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} />
    <div className="block w-full overflow-x-auto">
      <Table headers={headers} rows={rowsToDisplay} />
    </div>
  </div>;
}
