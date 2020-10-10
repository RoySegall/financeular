import React from 'react';
import {mount} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';
import {FILES} from "../../Apollo/Files";
import {elementShouldContainText, mountComponent, sleep} from "../../Tests/Utils";
import Dashboard, {DashboardFiles} from "./Dashboard";
import {act} from "react-dom/test-utils";
import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});

const mockRedirectLogin = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Redirect: ({ to }) => mockRedirectLogin,
    Link: ({children}) => children
  };
});

describe('Dashboard component', () => {

  const mocks = [{
    request: {
      query: FILES,
    },
    result: {
      data: {
        files: [],
      },
    },
  }];

  it('Should return the "Loading component" when loading the data', async () => {
    const wrapper = mountComponent({component: <DashboardFiles loading={true} />, wrapWithProvider: false});

    elementShouldContainText(wrapper, 'Loading');
    elementShouldContainText(wrapper, 'We are working on getting data from the server');
  });

  it('Should return the no files component when the response is empty', () => {
    const wrapper = mountComponent({component: <DashboardFiles loading={false} data={{files: []}} />, wrapWithProvider: false});

    elementShouldContainText(wrapper, 'No files were found....');
    elementShouldContainText(wrapper, 'We could not found files. You can upload some files');
  });

  it('Should show the list of files when querying the server', () => {
    const tree = renderer
      .create(<DashboardFiles
        loading={false}
        data={{files: [{id: 42, name: 'john', createDate: 'yesterday'}]}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
