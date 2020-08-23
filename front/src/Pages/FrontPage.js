import React from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import {Upload, Download} from "../Components/Buttons/Buttons";

export const FrontPage = () => <div className="flex flex-col">
    <PageTitle>Welcome to <b>Financular</b></PageTitle>
    <div className="w-11/12 m-auto">
        <p className="text-3xl pt-8 text-center font-sans font-hairline leading-loose">
            Have you ever tried to findout why you spend <b>too</b> much money?
        </p>
        <p className="text-3xl pt-8 text-center font-sans font-hairline leading-loose">
            Financular provides you a list of excel templates where you can pick the one who fits you, fill them with
            the income and outcomes, set your budget and see where you success, where you can improve and more.
        </p>

        <div className="flex justify-center">
            <Upload />
            <Download />
        </div>

    </div>

</div>
