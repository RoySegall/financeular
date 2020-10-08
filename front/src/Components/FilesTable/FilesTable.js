import React from "react";

export default () => <table className="table-auto w-11/12 m-auto">
  <thead>
    <tr>
      <th className="px-4 py-2 w-1/3">File name</th>
      <th className="px-4 py-2 w-1/3">Created at</th>
      <th className="px-4 py-2 w-1/3">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border px-4 py-2">foo.excel</td>
      <td className="border px-4 py-2">22/10/2002</td>
      <td className="border px-4 py-2">View | Delete</td>
    </tr>
  </tbody>
</table>
