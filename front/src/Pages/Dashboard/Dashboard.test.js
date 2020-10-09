import React from 'react';
import Login from "./Login";
import {mount} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';
import {LOGIN} from "../../Apollo/Login";

configure({adapter: new Adapter()});

const mockRedirectLogin = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Redirect: ({ to }) => mockRedirectLogin
  };
});

describe('Dashboard component', () => {

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
        login: { access_token: '1', expires: 'Buck', refresh_token: 'bulldog' },
      },
    },
  }];

  it('Should return the no files component when the response is empty', () => {
    expect(1).toBe(2);
  })

  it('Should return the "Loading component" when loading the data', () => {
    expect(1).toBe(2);
  });

  it('Should redirect to the front page when the user is not authorized', () => {
    expect(1).toBe(2);
  });

  it('Should show the list of files when querying the server', () => {
    expect(1).toBe(2);
  });

});
