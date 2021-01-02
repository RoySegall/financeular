import {formatToCurrency} from "./File.service";
import React from "react";
import Pager from "./Pager";

export default ({tableHeaders, borderColor, rows, tableTdWidth, perPage, currentPage, setCurrentPage, infoMode}) => {

  const showPager = rows.length > perPage;

  let numberOfPages = null;

  if (showPager) {
    numberOfPages = Math.ceil(rows.length / perPage);
  }

  const rowsToDisplay = !showPager ? rows : rows.slice(perPage * currentPage, perPage * (currentPage + 1));

  return <table className="w-full">

    <thead>
    {tableHeaders.map((tableHeader, key) => <th
      className={"text-left font-semibold uppercase py-3 px-2 border border-solid border-l-0 border-r-0 border-gray-200 bg-gray-100 text-gray-600"}
      key={key}>
      {tableHeader}
    </th>)}
    </thead>

    <tbody>

    {rowsToDisplay.map((rows, key) => {
      return <tr className="text-black border-b border-gray-300" key={key}>
        {rows.map((item, tdKey) => <td className={`px-2 ${tableTdWidth} pt-2`} key={tdKey}>{tdKey === 1 ? formatToCurrency(item) : item}</td>)}
        {infoMode === 'expenses' && <td colSpan={2}><p className="bg-green-100 p-2 border border-green-900 w-min text-black my-2 font-light text-xs rounded">Category</p></td>}
      </tr>
    })}

    {numberOfPages > 1 && <tr>
      <td colSpan={5} className="pr-2 pt-4">
        <Pager
          pages={numberOfPages}
          borderColor={borderColor}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages} />
      </td>
    </tr>}

    </tbody>
  </table>
}