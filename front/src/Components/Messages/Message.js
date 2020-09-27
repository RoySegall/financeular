import React from "react";
import {ErrorMark, InfoMark, WarningMark} from "../Icons/Icons";

export const BaseMessage = ({color, icon, message, children}) => <div className={`
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

export const Error = ({message, children}) => <BaseMessage color="red" icon={<ErrorMark />} message={message}>{children}</BaseMessage>
export const Notice = ({message, children}) => <BaseMessage color="yellow" icon={<WarningMark />} message={message}>{children}</BaseMessage>
export const Info = ({message, children}) => <BaseMessage color="blue" icon={<InfoMark />} message={message}>{children}</BaseMessage>


