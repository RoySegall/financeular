import React from "react";
import './table.css'
import {Shekel} from "../Icons/Icons";

export default () => <div className="table-wrapper">
    <table className="table">
        <thead>
            <tr className="headers">
                <td>Title</td>
                <td>Date</td>
                <td>Amount</td>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Burger</td>
                <td>08/01</td>
                <td>250 <Shekel /></td>
            </tr>
            <tr>
                <td>Burger</td>
                <td>08/01</td>
                <td>200 <Shekel /></td>
            </tr>
            <tr>
                <td>Burger</td>
                <td>08/01</td>
                <td>200 <Shekel /></td>
            </tr>
        </tbody>
    </table>

</div>
