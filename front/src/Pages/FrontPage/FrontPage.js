import React from "react";
import research from "./research.svg"
import personal from "./personal-settings.svg"
import openSource from "./opensource.svg"
import FrontPageBlock from "../../Components/FrontPageBlock/FrontPageBlock";
import {Code, FingerPrint, School} from "../../Components/Icons/Icons";

export default () => <div className="front-page flex flex-col pb-10">
  <FrontPageBlock
    image={research}
    imageClass="first"
    imageAlt="Researching money"
    title="Understanding money is hard"
    text={
      <>
        <p>
          Where have all your money? Your budget - do you in overdraft? How much did you actully spent the money and
          was it necessry?
        </p>
        <p className="pt-5">
          well, keep tracking on the expenses is very hard and might. Financular is a friendly tool that will help you
          track over your money.
        </p>
      </>
    }
    icon={<School />}
    iconType="red"
  />

  <FrontPageBlock
    className="pt-32"
    reversOrder={true}
    imageClass="second"
    image={personal}
    imageAlt="Personal settings"
    title="Privacy in mind"
    icon={<FingerPrint />}
    iconType="green"
    text={
      <>
        <p>Most of the tools requires you to give them information - receipts, information for logging into your bank account and more...</p>
        <p className="pt-5">When maintaining the data via excel and write down what you spent and got you can be assure that only minimal data is given with maximum feedback</p>
      </>
    }
  />
  <FrontPageBlock
    className="pt-32"
    imageClass="second"
    image={openSource}
    imageAlt="Personal settings"
    title="Open Source"
    icon={<Code />}
    iconType="pink"
    text={
      <>
        <p>Financular is opened source. Sure, you can register upload files. But, you can also take it and host it yourself
          and what ever you want to do.
        </p>

        <p className="pt-5">You can visit the github page, create prs and use all the infrastructure which finacular is
          based on: The backend, frontend, Docker files, the mobile apps and more. Take it and what ever you want.
        </p>
      </>
    }
  />
</div>
