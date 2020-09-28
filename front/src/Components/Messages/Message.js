import React from "react";
import {ErrorMark, InfoMark, Ok, WarningMark} from "../Icons/Icons";

export const BaseMessage = ({type, color, icon, message, children}) => <div className={`
    ${type}
    pb-2 pt-2
    mb-10
    border
    border-${color}-400
    bg-${color}-100
    w-3/4
    m-auto
    text-${color}-900
    font-bold
`}>
    <div className="flex items-center">
        <div className="w-1/4 text-3xl">{icon}</div>
        <div className="w-2/4 text-left">{children ? children : message}</div>
    </div>
</div>

export const Error = ({message, children}) => <BaseMessage type="error" color="red" icon={<ErrorMark />} message={message}>{children}</BaseMessage>
export const Notice = ({message, children}) => <BaseMessage type="notice" color="yellow" icon={<WarningMark />} message={message}>{children}</BaseMessage>
export const Info = ({message, children}) => <BaseMessage type="info" color="blue" icon={<InfoMark />} message={message}>{children}</BaseMessage>
export const Success = ({message, children}) => <BaseMessage type="success" color="green" icon={<Ok />} message={message}>{children}</BaseMessage>


