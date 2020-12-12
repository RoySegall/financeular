import React from "react";
import {At, DataBase, Folder, UnLock, User} from "./Icons/Icons";

export default () => {
  const links = [
    <><Folder /> View files</>,
    <><DataBase /> Manage terms</>,
    <><UnLock /> Edit password</>,
    <><At /> Change email</>,
    <><User /> Personal details</>
  ];
  return <ul>
    {links.map((link, id) => <li><a className="no-underline text-xl pb-3 block">{link}</a></li>)}
  </ul>
}
