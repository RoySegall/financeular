import React from "react";
import Logo from "../Components/Logo/Logo";

export const General = ({children}) => <>
    <header className="border-b border-yellow-600 shadow-md mb-5 bg-red-100">
        <Logo />
    </header>

    <main>
        {children}
    </main>
</>
