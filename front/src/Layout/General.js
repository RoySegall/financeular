import React from "react";
import Logo from "../Components/Logo/Logo";
import {Link} from "react-router-dom";
import LoggedIn from "../Components/LoggedIn/LoggedIn";

export default ({children}) => <>
    <header className="border-b border-yellow-600 shadow-md flex justify-between items-center">
        <Link to="/"><Logo /></Link>
        <LoggedIn />
    </header>

    <main className="flex">
        {children}
    </main>
</>
