import React from 'react';
import Login, {LOGINQUERY} from "./Login";
import {mount} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';

configure({adapter: new Adapter()});

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

  it ('Testing the required field', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks} addTypename={false}><Login /></MockedProvider>);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    await new Promise((r) => setTimeout(r, 1000));

    wrapper.update();
    expect(wrapper.find('.error').html()).toContain('Username is required');
    expect(wrapper.find('.error').html()).toContain('Password is required');

    // Setting only the username and verify we got an error relate to the password.
    const username = wrapper.find('#username');
    username.instance().value = 'username';
    username.simulate('change');

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    await new Promise((r) => setTimeout(r, 1000));

    wrapper.update();
    expect(wrapper.find('.error').html()).toContain('Password is required');

    // Setting the password.
    const password = wrapper.find('#password');
    password.instance().value = 'password';
    password.simulate('change');

    // Submit the form and make sure no errors are thrown.
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    await new Promise((r) => setTimeout(r, 1000));

    wrapper.update();
    expect(wrapper.find('.error').length).toBe(0);
  });

  it('verify we can handle errors from the server when log in', async () => {
    const mockWithError = [{
      request: mocks[0].request,
      error: new Error('Something went wrong'),
    }];
    const wrapper = mount(<MockedProvider mocks={mockWithError} addTypename={false}><Login /></MockedProvider>);
    const username = wrapper.find('#username');
    username.instance().value = 'username';
    username.simulate('change');

    const password = wrapper.find('#password');
    password.instance().value = 'password';
    password.simulate('change');

    // Submit the form and make sure no errors are thrown.
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    await new Promise((r) => setTimeout(r, 1000));

    wrapper.update();
    expect(wrapper.find('.error').html()).toContain('Something went wrong');
  });

  it('Verify we can handle successful login', async () => {
    const wrapper = mount(<MockedProvider mocks={mocks} addTypename={false}><Login /></MockedProvider>);
    const username = wrapper.find('#username');
    username.instance().value = 'username';
    username.simulate('change');

    const password = wrapper.find('#password');
    password.instance().value = 'password';
    password.simulate('change');

    // Submit the form and make sure no errors are thrown.
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    await new Promise((r) => setTimeout(r, 1000));

    wrapper.update();
    expect(wrapper.find('.success').html()).toContain('You are logged in successfully');
  });
});
