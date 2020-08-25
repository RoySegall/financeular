import React from "react";
import results from './results.json';
import "./results.css";
import PageTitle from "../Components/PageTitle/PageTitle";
import Table from "../Components/Table/Table";
import Notes from "../Components/Notes/Notes";
import Bar from "../Components/Graphs/Bar";
import Pie from "../Components/Graphs/Pie";
import {Income, Expenses} from "../Components/Icons/Icons";

export default class Results extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: results
        }
    }

    render() {
        const {results} = this.state;
        return <div className="pl-5 pr-5">
            <PageTitle align={'left'}>Results for the month {results.month}/{results.year}</PageTitle>

            <div className="grid grid-cols-12 h-screen">
                <div className="col-span-6 pb-10 pr-5">
                    <h2 className="text-2xl font-bold pb-4"><Income/> Income</h2>
                    <Table />
                </div>
                <div className="col-span-6 pb-10 pl-5">
                    <h2 className="text-2xl font-bold pb-4"><Expenses/> Expenses</h2>
                    <Table />
                </div>
                <div className="col-span-12 pl-2"><Notes /></div>

                <div className="col-span-9 bar-height"><Bar /></div>
                <div className="col-span-3 bar-height"><Pie /></div>
            </div>
        </div>
    }
}
