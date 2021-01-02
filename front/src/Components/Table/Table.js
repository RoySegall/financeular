import React from "react";

const tableHeadersClass =
  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 " +
  "border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 " +
  "text-gray-600 border-gray-200";
const rowsTableClass =
  "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs " +
  "whitespace-no-wrap p-4 text-left";


const TableHead = ({headers}) => <thead>
  <tr>{headers.map((title, id) => <th key={id} className={tableHeadersClass}>{title}</th>)}</tr>
</thead>

const TableBody = ({rows}) => <tbody>
  {rows.map((row, id) => <tr key={id}>
    {row.map((column, rowId) => <td id={rowId} className={rowsTableClass}>{column}</td>)}</tr>
  )}
</tbody>

export default ({headers, rows}) => <table className="items-center w-full bg-transparent border-collapse">
  <TableHead headers={headers} />
  <TableBody rows={rows} />
</table>
