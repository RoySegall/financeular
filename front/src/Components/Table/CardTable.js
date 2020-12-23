import React, {useState} from "react";
import PropTypes from "prop-types";
import {Next, Prev} from "../Icons/Icons";

export default function CardTable({ color, title, headers, rows, className, perPage }) {
  const showPager = rows.length > perPage;
  const [currentPage, setCurrentPage] = useState(0);

  let numberOfPages = null;

  if (showPager) {
    numberOfPages = Math.ceil(rows.length / perPage);
  }

  const rowsToDisplay = rows.slice(perPage*currentPage, perPage * (currentPage + 1));

  return (
    <>
      <div
        className={
          `relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${className} ${(color === "light" ? "bg-white" : "bg-blue-900 text-white")}`
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex text-left justify-between">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-gray-800" : "text-white")
                }
              >
                {title}
              </h3>

              {showPager && <span>
                <button onClick={(e) => {
                  e.preventDefault()
                  currentPage > 0 && setCurrentPage(currentPage - 1)}
                } className="pr-1 cursor-pointer underline"><Prev /></button>
                {currentPage + 1} of {numberOfPages}
                <button onClick={(e) => {
                  e.preventDefault();
                  currentPage + 1 < numberOfPages && setCurrentPage(currentPage + 1)}} className="pl-1 cursor-pointer underline"><Next /></button>
              </span>}
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {headers.map((title, id) => <th key={id} className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  {title}
                </th>)}
              </tr>
            </thead>
            <tbody>

            {rowsToDisplay.map((row, id) => <tr key={id}>
              {row.map((column, id) => {
                let className = 'border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left';
                return <td id={id} className={className}>{column} </td>
              })}
            </tr>)}

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
