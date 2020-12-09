import React from "react";

export const Submit = ({children, clickHandler, disabled}) => <button type="button" disabled={disabled} onClick={clickHandler} className="button-submit shadow-md">
    {children}
</button>

export const LoginWith = ({social, children}) => <button className={`button login-in ${social} shadow-md`}>
    {children}
</button>
