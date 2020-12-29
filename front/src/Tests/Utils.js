import React from 'react';
import {mount} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MockedProvider} from "@apollo/client/testing";

configure({adapter: new Adapter()});

export const sleep = async (time) => await new Promise((r) => setTimeout(r, time));

export const elementShouldBeHidden = (wrapper) => {
  expect(wrapper.find('.error').length).toBe(0);
};

export const elementShouldContainText = (wrapper, message) => {
  expect(wrapper.html()).toContain(message);
}

export const elementShouldExists = (wrapper, times) => {
  expect(wrapper.length).toBe(times);
};

export const mountComponent = ({mocks, addTypename = false, component, wrapWithProvider = true}) => {

  if (!wrapWithProvider) {
    return mount(component);
  }

  return mount(<MockedProvider mocks={mocks} addTypename={addTypename}>{component}</MockedProvider>);
}
