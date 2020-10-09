import React from "react";

export default ({files}) => <table>
  <thead>
    <tr>
      <th>File name</th>
      <th>Created at</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>

  {files.map((file, key) => <tr key={key}>
      <td>{file.name}</td>
      <td>{file.createDate}</td>
      <td>View | Delete</td>
  </tr>)}
  </tbody>
</table>
