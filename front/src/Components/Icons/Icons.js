import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMoneyBillAlt} from "@fortawesome/free-regular-svg-icons";

import {faCreditCard} from "@fortawesome/free-regular-svg-icons";
import { faCloudUploadAlt, faCloudDownloadAlt, faSignInAlt, faPiggyBank, faCalculator, faExclamationCircle, faTimesCircle, faInfoCircle, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faFacebookSquare, faGoogle, faApple} from "@fortawesome/free-brands-svg-icons";

export const UploadCloud = () => <FontAwesomeIcon icon={faCloudUploadAlt}/>
export const DownloadCloud = () => <FontAwesomeIcon icon={faCloudDownloadAlt}/>
export const Login = () => <FontAwesomeIcon icon={faSignInAlt}/>
export const Facebook = () => <FontAwesomeIcon icon={faFacebookSquare}/>
export const Google = () => <FontAwesomeIcon icon={faGoogle}/>
export const Apple = () => <FontAwesomeIcon icon={faApple}/>
export const Income = () => <FontAwesomeIcon icon={faPiggyBank}/>
export const Expenses = () => <FontAwesomeIcon icon={faCreditCard}/>
export const Calculator = () => <FontAwesomeIcon icon={faCalculator}/>
export const MoneyBill = () => <FontAwesomeIcon icon={faMoneyBillAlt}/>
export const ErrorMark = () => <FontAwesomeIcon icon={faTimesCircle}/>
export const WarningMark = () => <FontAwesomeIcon icon={faExclamationCircle}/>
export const InfoMark = () => <FontAwesomeIcon icon={faInfoCircle}/>
export const Ok = () => <FontAwesomeIcon icon={faCheckCircle}/>
