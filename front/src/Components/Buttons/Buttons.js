import React from "react";

export const Submit = ({children, clickHandler, disabled}) => <button type="button" disabled={disabled} onClick={clickHandler} className="button-submit shadow-md">
    {children}
</button>

export const LoginWith = ({social, children}) => <button className={`button login-in ${social} shadow-md`}>
    {children}
</button>

export const SmallButton = ({children, color = 'blue'}) => <button
  className={`bg-${color}-500 text-white active:bg-${color}-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}>
  {children}
</button>
