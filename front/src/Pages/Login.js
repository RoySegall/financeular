import React from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import "./login.scss";
import {LoginWith, Submit} from "../Components/Buttons/Buttons";
import {Apple, Facebook, Google, Login} from "../Components/Icons/Icons";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Error} from "../Components/Messages/Message";

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('The password is required'),
});

export default () => <div className="login-screen">

  <div className="login-wrapper shadow-lg">
    <PageTitle>Login</PageTitle>

    <Formik
      initialValues={
        {username: '', password: ''}
      }
      validationSchema={loginSchema}
      onSubmit={(values => {
        // todo: login here.
        console.log(values);
      })}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <form className="pt-10 text-center login-form" onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && <Error>

            {Object.values(errors).map((item, key) => <span key={key} className="block">{item}</span>)}

          </Error>}
          <div className="grid grid-cols-6">
            <label className="block col-span-3 pb-12 text-2xl pr-10">Username</label>
            <div className="block col-span-3 text-left">
              <input
                type="text"
                id="username"
                className={`input-element ${errors.username && 'invalid-input'}`}
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
            </div>

            <label className="block col-span-3 pb-12 text-2xl pr-10">Password</label>
            <div className="block col-span-3 text-left">
              {}
              <input
                type="password"
                id="password"
                className={`input-element ${errors.password && 'invalid-input'}`}
                placeholder="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
          </div>

          <div className="">
            <button type="submit" className="button submit shadow" disabled={isSubmitting}>
              <Login/> Login
            </button>
          </div>

          <div className="pt-10">
            <h3 className="text-2xl font-bold underline pb-8">or login with: </h3>

            <div className="flex">
              <LoginWith social="facebook"><Facebook/> Facebook</LoginWith>
              <LoginWith social="google"><Google/> Google</LoginWith>
              <LoginWith social="apple"><Apple/> Apple</LoginWith>
            </div>
          </div>

        </form>
      )}
    </Formik>

  </div>

</div>
