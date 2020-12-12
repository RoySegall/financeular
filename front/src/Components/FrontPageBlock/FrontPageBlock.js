import React from "react";
import Card from "../Card/Card";

export default ({image, imageAlt, title, text, icon, iconType, reversOrder, imageClass, className}) => <section className={`flex pl-6 pr-6 pt-10 justify-center items-center ${reversOrder ? 'flex-row-reverse' : ''} ${className}`}>
  <div className="w-6/12 text-center">

    <Card title={title} text={text} icon={icon} iconType={iconType} textSize="big">
    </Card>
  </div>

  <div className="w-6/12 text-center">
    <img alt={imageAlt} className={imageClass} src={image} />
  </div>

</section>
