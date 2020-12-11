import React from "react";
import {ErrorMark, InfoMark, Ok, WarningMark} from "../Icons/Icons";

const BaseMessageButtons = ({color, firstButtonCallback, secondButtonCallback, firstButtonText, secondButtonText}) =>
  <div className="flex m-0 m-auto">
    {firstButtonCallback &&
      <button
        className={`pt-2 pb-2 pl-4 pr-4 rounded mr-4 border border-${color}-400 bg-${color}-600 text-light-white font-bold`}
        onClick={() => firstButtonCallback}
      >{firstButtonText ? firstButtonText : 'Approve'}</button>}
    {secondButtonCallback &&
      <button
        className={`pt-2 pb-2 pl-4 pr-4 rounded mr-4 border border-${color}-400 bg-${color}-300 text-light-white font-bold`}
        onClick={() => secondButtonCallback}
      >{secondButtonText ? secondButtonText : 'Discard'}</button>}
  </div>

export const BaseMessage = ({type, color, icon, message, children, firstButtonCallback, secondButtonCallback, firstButtonText, secondButtonText}) => {
  return <section
    className={`${type} align-middle bg-white w-9/12 m-auto m-0 relative flex flex-col mb-6 shadow-lg rounded p-2 px-4 py-5 border-2 border-${color}-900 bg-${color}-100 shadow-${color}`}>
    <div
      className={`m-auto m-0 -mt-12 p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full text-4xl bg-${color}-400 text-white shadow-${color}`}>
      {icon}
    </div>

    <h2 className={`text-2xl text-${color}-900 font-semibold text-black pb-4 text-center`}>{message}</h2>

    {(firstButtonCallback || secondButtonCallback) &&
    <BaseMessageButtons color={color} firstButtonCallback={firstButtonCallback}
                        secondButtonCallback={secondButtonCallback} firstButtonText={firstButtonText}
                        secondButtonText={secondButtonText}>

    </BaseMessageButtons>}
  </section>
}

export const Error = ({message, children, firstButtonCallback, secondButtonCallback, firstButtonText, secondButtonText}) =>
  <BaseMessage
    type="error"
    color="red"
    icon={<ErrorMark/>}
    message={message}
    firstButtonCallback={firstButtonCallback}
    secondButtonCallback={secondButtonCallback}
    firstButtonText={firstButtonText}
    secondButtonText={secondButtonText}
  >{children}</BaseMessage>

export const Notice = ({message, children, firstButtonCallback, secondButtonCallback, firstButtonText, secondButtonText}) =>
  <BaseMessage
    type="notice"
    color="yellow"
    icon={<WarningMark/>} message={message}
   firstButtonCallback={firstButtonCallback}
    secondButtonCallback={secondButtonCallback}
   firstButtonText={firstButtonText}
    secondButtonText={secondButtonText}
  >{children}</BaseMessage>

export const Info = ({message, children, firstButtonCallback, secondButtonCallback, firstButtonText, secondButtonText}) =>
  <BaseMessage
    type="info"
    color="blue"
    icon={<InfoMark/>}
    message={message}
    firstButtonCallback={firstButtonCallback}
    secondButtonCallback={secondButtonCallback}
    firstButtonText={firstButtonText}
    secondButtonText={secondButtonText}
  >{children}</BaseMessage>

export const Success = ({message, children, firstButtonCallback, secondButtonCallback, firstButtonText, secondButtonText}) =>
  <BaseMessage
    type="success"
    color="green"
    icon={<Ok/>}
    message={message}
    firstButtonCallback={firstButtonCallback}
    secondButtonCallback={secondButtonCallback}
    firstButtonText={firstButtonText}
    secondButtonText={secondButtonText}
  >{children}</BaseMessage>
