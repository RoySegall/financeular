import React from "react";
import "./button.css";
import {DownloadCloud, UploadCloud} from "../Icons/Icons";

export const Upload = () => <button className="button upload shadow-md">
    <UploadCloud />Upload a file
</button>

export const Download = () => <button className="button download shadow-md">
    <DownloadCloud />Upload a template
</button>
