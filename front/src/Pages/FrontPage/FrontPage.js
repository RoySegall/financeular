import React from "react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import research from "./research.svg"
import personal from "./personal-settings.svg"

const FrontPageBlock = ({image, imageAlt, title, text, reversOrder, imageClass, className}) => <section className={`flex pl-6 pr-6 pt-10 justify-center ${reversOrder ? 'flex-row-reverse' : ''} ${className}`}>
  <div className="w-6/12 text-center">
    <h2 className="text-2xl pb-5">{title}</h2>

    <p>{text}</p>
  </div>

  <div className="w-6/12 text-center">
    <img alt={imageAlt} className={imageClass} src={image} />
  </div>

</section>

export default () => <div className="front-page flex flex-col pb-10">
  <PageTitle>Welcome to <b>Financular</b></PageTitle>

  <FrontPageBlock
    image={research}
    imageClass="first"
    imageAlt="Reasrching money"
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
        <p className="pt-5">When mainting the data via excel and write down what you spent and got you can be assure that only minimal data is given with maximum feedback</p>
      </>
    }
  />
</div>
