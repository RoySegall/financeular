import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {elementShouldContainText, mountComponent} from "../../Tests/Utils";
import renderer from 'react-test-renderer';
import {DashboardFiles} from "../../Components/DashboardFiles/DashboardFiles";
import Dashboard from "./Dashboard";

configure({adapter: new Adapter()});

const mockRedirectLogin = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Redirect: ({ to }) => mockRedirectLogin,
    Link: ({children}) => children
  };
});

describe('Dashboard component', () => {

  it('Should return the "Loading component" when loading the data', async () => {
    const wrapper = mountComponent({component: <Dashboard loading={true} />, wrapWithProvider: true});

    elementShouldContainText(wrapper, 'Loading');
    elementShouldContainText(wrapper, 'We are working on getting data from the server');
  });

  it('Should return the no files component when the response is empty', () => {
    const wrapper = mountComponent({component: <DashboardFiles loading={false} data={{me: {files: []}}} />, wrapWithProvider: false});

    elementShouldContainText(wrapper, 'No files were found....');
    elementShouldContainText(wrapper, 'We could not found files. You can upload some files');
  });

  it('Should show the list of files when querying the server', () => {
    const tree = renderer
      .create(<DashboardFiles
        loading={false}
        data={{me: {files: [{id: 42, name: 'john', created_at: 'yesterday'}]}}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
