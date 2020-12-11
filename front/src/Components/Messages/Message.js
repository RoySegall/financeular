import React from "react";
import {ErrorMark, InfoMark, Ok, WarningMark} from "../Icons/Icons";

export const BaseMessage = ({type, color, icon, message, children}) => {
    return <section
        className={`${type} align-middle bg-white w-9/12 m-auto m-0 relative flex flex-col mb-6 shadow-lg rounded p-2 px-4 py-5 border-2 border-${color}-900 bg-${color}-100`}>
        <div className={`m-auto m-0 -mt-12 p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full text-4xl bg-${color}-400 text-white shadow-${color}`}>
            {icon}
        </div>

        <h2 className={`text-2xl text-${color}-900 font-semibold text-black pb-4 text-center`}>{message}</h2>
    </section>
}

export const Error = ({message, children}) => <BaseMessage type="error" color="red" icon={<ErrorMark />} message={message}>{children}</BaseMessage>
export const Notice = ({message, children}) => <BaseMessage type="notice" color="yellow" icon={<WarningMark />} message={message}>{children}</BaseMessage>
export const Info = ({message, children}) => <BaseMessage type="info" color="blue" icon={<InfoMark />} message={message}>{children}</BaseMessage>
export const Success = ({message, children}) => <BaseMessage type="success" color="green" icon={<Ok />} message={message}>{children}</BaseMessage>
