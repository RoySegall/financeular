import React from "react";

export default ({image, imageAlt, title, text, reversOrder, imageClass, className}) => <section className={`flex pl-6 pr-6 pt-10 justify-center ${reversOrder ? 'flex-row-reverse' : ''} ${className}`}>
  <div className="w-6/12 text-center">
    <h2 className="text-2xl pb-5">{title}</h2>

    <p>{text}</p>
  </div>

  <div className="w-6/12 text-center">
    <img alt={imageAlt} className={imageClass} src={image} />
  </div>

</section>
