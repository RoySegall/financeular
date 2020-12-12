import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMoneyBillAlt} from "@fortawesome/free-regular-svg-icons";

import {faCreditCard} from "@fortawesome/free-regular-svg-icons";
import {
  faCloudUploadAlt,
  faCloudDownloadAlt,
  faSignInAlt,
  faPiggyBank,
  faCalculator,
  faExclamation,
  faTimes,
  faInfo,
  faCheck,
  faSpinner,
  faSchool,
  faFingerprint,
  faFolderOpen,
  faUnlock,
  faAt,
  faUser,
  faDatabase
} from "@fortawesome/free-solid-svg-icons";
import {faFacebookSquare, faGoogle, faApple} from "@fortawesome/free-brands-svg-icons";
import {faFileCode} from "@fortawesome/free-regular-svg-icons";

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
export const ErrorMark = () => <FontAwesomeIcon icon={faTimes}/>
export const WarningMark = () => <FontAwesomeIcon icon={faExclamation}/>
export const InfoMark = () => <FontAwesomeIcon icon={faInfo}/>
export const Ok = () => <FontAwesomeIcon icon={faCheck}/>
export const Spinner = () => <FontAwesomeIcon icon={faSpinner} className="fa-spin"/>
export const School = () => <FontAwesomeIcon icon={faSchool} />
export const FingerPrint = () => <FontAwesomeIcon icon={faFingerprint} />
export const Code = () => <FontAwesomeIcon icon={faFileCode} />
export const Folder = () => <FontAwesomeIcon icon={faFolderOpen} />
export const UnLock = () => <FontAwesomeIcon icon={faUnlock} />
export const At = () => <FontAwesomeIcon icon={faAt} />
export const User = () => <FontAwesomeIcon icon={faUser} />
export const DataBase = () => <FontAwesomeIcon icon={faDatabase} />
