import React from 'react';
import Login, {LOGINQUERY} from "./Login";
import {mount} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';

configure({adapter: new Adapter()});

const mockRedirectLogin = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Redirect: ({ to }) => mockRedirectLogin
  };
});


describe('Login component', () => {

  const mocks = [
    {
      request: {
        query: LOGINQUERY,
        variables: {
          username: 'username',
          password: 'password',
        },
      },
      result: {
        data: {
          login: { access_token: '1', expires: 'Buck', refresh_token: 'bulldog' },
        },
      },
    },
  ];

  const sleep = async (time) => await new Promise((r) => setTimeout(r, time));

  const submitForm = async (wrapper) => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    await sleep(1000);
    wrapper.update();
  };

  const elementShouldContainText = (wrapper, message) => {
    expect(wrapper.html()).toContain(message);
  }

  const setInputValue = (wrapper, value) => {
    wrapper.instance().value = value;
    wrapper.simulate('change');
  };

  const elementShouldBeHidden = (wrapper) => {
    expect(wrapper.find('.error').length).toBe(0);
  };

  it ('Testing the required field', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks} addTypename={false}><Login /></MockedProvider>);
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
    const wrapper = mount(<MockedProvider mocks={mockWithError} addTypename={false}><Login /></MockedProvider>);

    setInputValue(wrapper.find('#username'), 'username');
    setInputValue(wrapper.find('#password'), 'password');

    // Verify we got the correct error.
    await submitForm(wrapper);
    elementShouldContainText(wrapper.find('.error'), 'Something went wrong');
  });

  it('Verify we can handle successful login', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks} addTypename={false}><Login /></MockedProvider>);

    setInputValue(wrapper.find('#username'), 'username');
    setInputValue(wrapper.find('#password'), 'password');

    // Verify we got the correct error.
    await submitForm(wrapper);
    elementShouldContainText(wrapper.find('.success'), 'You are logged in successfully');
  });
});
