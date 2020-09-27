import React from "react";
import "./logo.scss";
import {MoneyBill} from "../Icons/Icons";

export default () => <div className="logo block">
    <div className="flex items-center">
        <MoneyBill /> <span className="text">Financular</span>
    </div>
    <div className="sub-text">
        Understand money, better
    </div>
</div>
