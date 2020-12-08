import React from 'react';
import Login from "./Login";
import { MockedProvider } from '@apollo/client/testing';
import {LOGIN} from "../../Apollo/Login";
import {
  elementShouldBeHidden,
  sleep,
  elementShouldContainText,
  mountComponent
} from "../../Tests/Utils";

const mockRedirectLogin = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Redirect: ({ to }) => mockRedirectLogin
  };
});

describe('Login component', () => {

  const mocks = [{
    request: {
      query: LOGIN,
      variables: {
        username: 'username',
        password: 'password',
      },
    },
    result: {
      data: {
        login: { accessToken: '1', expires: 'Buck'},
      },
    },
  }];

  const submitForm = async (wrapper) => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    await sleep(1000);
    wrapper.update();
  };

  const setInputValue = (wrapper, value) => {
    wrapper.instance().value = value;
    wrapper.simulate('change');
  };

  it ('Testing the required field', async () => {
    const wrapper = mountComponent({mocks: mocks, component: <Login />});
    await submitForm(wrapper);

    elementShouldContainText(wrapper.find('.error'), 'Username is required');
    elementShouldContainText(wrapper.find('.error'), 'Password is required');

    // Setting only the username and verify we got an error relate to the password.
    setInputValue(wrapper.find('#username'), 'username');
    await submitForm(wrapper);
    elementShouldContainText(wrapper.find('.error'), 'Password is required');

    // Setting the password.
    setInputValue(wrapper.find('#password'), 'password');
    await submitForm(wrapper);

    // Verify we don't got any errors.
    elementShouldBeHidden(wrapper.find('.error'));
  });

  it('verify we can handle errors from the server when log in', async () => {
    const mockWithError = [{
      request: mocks[0].request,
      error: new Error('Something went wrong'),
    }];

    const wrapper = mountComponent({mocks: mockWithError, component: <Login />});

    setInputValue(wrapper.find('#username'), 'username');
    setInputValue(wrapper.find('#password'), 'password');

    // Verify we got the correct error.
    await submitForm(wrapper);
    elementShouldContainText(wrapper.find('.error'), 'Something went wrong');
  });

  it('Verify we can handle successful login', async () => {
    const wrapper = mountComponent({mocks: mocks, component: <Login />});

    setInputValue(wrapper.find('#username'), 'username');
    setInputValue(wrapper.find('#password'), 'password');

    // Verify we got the correct error.
    await submitForm(wrapper);
    elementShouldContainText(wrapper.find('.success'), 'You are logged in successfully');
  });

});
