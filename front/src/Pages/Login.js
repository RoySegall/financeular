import React from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import "./login.css";
import {LoginWith, Submit, Upload} from "../Components/Buttons/Buttons";
import {Apple, Facebook, Google, Login} from "../Components/Icons/Icons";
import {Link} from "react-router-dom";

export default () => <div className="login-screen">

    <div className="login-wrapper shadow-lg">
        <PageTitle>Login</PageTitle>

        <form className="pt-10 text-center login-form">
            <div className="grid grid-cols-6">
                <label className="block col-span-3 pb-12 text-2xl pr-10">Username</label>
                <div className="block col-span-3 text-left">
                    <input type="text" id="username" className="input-element" placeholder="Username"/>
                </div>

                <label className="block col-span-3 pb-12 text-2xl pr-10">Password</label>
                <div className="block col-span-3 text-left">
                    <input type="password" id="password" className="input-element" placeholder="password"/>
                </div>
            </div>

            <div className="">
                <Link to="/results"><Submit><Login /> Login</Submit></Link>
            </div>

            <div className="pt-10">
                <h3 className="text-2xl font-bold underline pb-8">or login with: </h3>

                <div className="flex">
                    <LoginWith social="facebook"><Facebook /> Facebook</LoginWith>
                    <LoginWith social="google"><Google /> Google</LoginWith>
                    <LoginWith social="apple"><Apple /> Apple</LoginWith>
                </div>
            </div>

        </form>
    </div>

</div>
