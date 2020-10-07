import React from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import research from "./research.svg"
import personal from "./personal-settings.svg"
import FrontPageBlock from "../../Components/FrontPageBlock/FrontPageBlock";

export default () => <div className="front-page flex flex-col pb-10">
  <PageTitle>Welcome to <b>Financular</b></PageTitle>

  <FrontPageBlock
    image={research}
    imageClass="first"
    imageAlt="Researching money"
    title="Understanding money is hard"
    text="We have the right tools to help you understand where you spent you're money"
  />

  <FrontPageBlock
    className="pt-32"
    reversOrder={true}
    imageClass="second"
    image={personal}
    imageAlt="Personal settings"
    title="Privacy in mind"
    text={
      <>
        <p>Most of the tools requires you to give them information - receipts, information for logging into your bank account and more...</p>
        <p className="pt-5">When maintaining the data via excel and write down what you spent and got you can be assure that only minimal data is given with maximum feedback</p>
      </>
    }
  />
</div>
