import React from "react";
import IllustrationWithMessage from "../IllustrationWithMessage/IllustrationWithMessage";
import loadingImage from "./loading.svg";

export default () => <div className="w-screen text-center">
  <IllustrationWithMessage
    message="Loading..."
    secondMessage="We are working on getting data from the server"
    image={loadingImage}
    imageAlt="Loading..."
  />
</div>
