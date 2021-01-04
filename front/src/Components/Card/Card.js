import React from "react";

export default ({icon, iconType, title, text, textSize = 'normal', className = null}) => {

  const textSizes = {
    normal: {
      icon: 'text-2xl',
      title: 'text-xl',
      p: '',
    },
    big: {
      icon: 'text-3xl',
      title: 'text-2xl',
      p: 'text-xl',
    }
  };

  return <section className={`align-middle bg-white w-9/12 m-auto m-0 relative flex flex-col mb-6 shadow-lg rounded p-2 px-4 py-5 ${className}`}>
    <div className={`m-auto m-0 p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full ${textSizes[textSize]['icon']} bg-${iconType}-400 text-white`}>
      {icon}
    </div>

    <h2 className={`${textSizes[textSize]['title']} font-semibold text-black pb-4`}>{title}</h2>

    <p className={`${textSizes[textSize]['p']} mt-2 mb-4 text-gray-600`}>{text}</p>
  </section>
}
