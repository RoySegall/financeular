import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCloudUpload, faCloudDownload, faSignInAlt} from "@fortawesome/pro-duotone-svg-icons";
import {faFacebookSquare, faGoogle, faApple} from "@fortawesome/free-brands-svg-icons";

export const UploadCloud = () => <FontAwesomeIcon icon={faCloudUpload}/>
export const DownloadCloud = () => <FontAwesomeIcon icon={faCloudDownload}/>
export const Login = () => <FontAwesomeIcon icon={faSignInAlt}/>
export const Facebook = () => <FontAwesomeIcon icon={faFacebookSquare}/>
export const Google = () => <FontAwesomeIcon icon={faGoogle}/>
export const Apple = () => <FontAwesomeIcon icon={faApple}/>
