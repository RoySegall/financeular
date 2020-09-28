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
          name: 'Buck',
        },
      },
      result: {
        data: {
          dog: { id: '1', name: 'Buck', breed: 'bulldog' },
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

  it('verify we can handle errors from the server when log in', () => {
    expect(1).toBe(2);
  });

  it('Verify we can handle successful login', () => {
    expect(1).toBe(2);
  });
});
