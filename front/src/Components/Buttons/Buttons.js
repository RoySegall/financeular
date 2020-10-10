import React from "react";
import "./button.scss";
import {DownloadCloud, UploadCloud} from "../Icons/Icons";

export const Upload = () => <button className="button upload shadow-md">
    <UploadCloud /> Upload a file
</button>

export const Submit = ({children, clickHandler, disabled}) => <button type="button" disabled={disabled} onClick={clickHandler} className="button submit shadow-md">
    {children}
</button>

export const Download = () => <button className="button download shadow-md">
    <DownloadCloud /> Upload a template
</button>

export const LoginWith = ({social, children}) => <button className={`button login-in ${social} shadow-md`}>
    {children}
</button>
