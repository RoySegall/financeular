import React from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import "./login.css";

export default () => <div className="login-screen">

    <div className="w-2/4">
        <PageTitle>Login</PageTitle>

        <form className="grid grid-cols-6 pt-10 text-center login-form">

            <label className="block col-span-3 pb-12 text-2xl text-right pr-10">Username</label>
            <div className="block col-span-3 text-left">
                <input type="text" id="username" className="input-element" placeholder="Username"/>
            </div>

            <label className="block col-span-3 pb-12 text-2xl text-right pr-10">Password</label>
            <div className="block col-span-3 text-left">
                <input type="password" id="password" className="input-element" placeholder="password"/>
            </div>

        </form>
    </div>

</div>
