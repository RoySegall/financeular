import React from "react";

export default ({message, image, imageAlt, secondMessage}) => <div className="illustrationWithMessage">
  <h2 className="text-center pt-10 pb-10 text-3xl font-thin">{message}</h2>
  <img className="illustration-image" src={image} alt={imageAlt} />
  <p className="text-center pt-10 pb-10 text-2xl font-thin">{secondMessage}</p>
</div>
