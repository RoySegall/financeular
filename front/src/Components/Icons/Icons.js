import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faCloudUpload,
    faCloudDownload,
    faSignInAlt,
    faShekelSign,
    faPiggyBank,
    faCreditCardFront,
    faAbacus, faMoneyBillAlt
} from "@fortawesome/pro-duotone-svg-icons";
import {faFacebookSquare, faGoogle, faApple} from "@fortawesome/free-brands-svg-icons";

export const UploadCloud = () => <FontAwesomeIcon icon={faCloudUpload}/>
export const DownloadCloud = () => <FontAwesomeIcon icon={faCloudDownload}/>
export const Login = () => <FontAwesomeIcon icon={faSignInAlt}/>
export const Facebook = () => <FontAwesomeIcon icon={faFacebookSquare}/>
export const Google = () => <FontAwesomeIcon icon={faGoogle}/>
export const Apple = () => <FontAwesomeIcon icon={faApple}/>
export const Shekel = () => <FontAwesomeIcon icon={faShekelSign}/>
export const Income = () => <FontAwesomeIcon icon={faPiggyBank}/>
export const Expenses = () => <FontAwesomeIcon icon={faCreditCardFront}/>
export const Calculator = () => <FontAwesomeIcon icon={faAbacus}/>
export const MoneyBill = () => <FontAwesomeIcon icon={faMoneyBillAlt}/>
