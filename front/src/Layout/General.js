import React from "react";
import Logo from "../Components/Logo/Logo";
import {Link} from "react-router-dom";

export default ({children}) => <>
    <header className="border-b border-yellow-600 shadow-md bg-red-100">
        <Link to="/"><Logo /></Link>
    </header>

    <main>
        {children}
    </main>
</>
