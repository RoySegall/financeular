import renderer from "react-test-renderer";
import React from "react";
import Pager from "./Pager";
import {clickOnElement, elementShouldContainText, mountComponent} from "../../Tests/Utils";

const mockSetCurrentPage = jest.fn();

describe('Pager component', () => {

  it('Snap shot the component', () => {
    const tree = renderer
      .create(<Pager
        borderColor={'green'}
        currentPage={0}
        setCurrentPage={() => {}}
        numberOfPages={20}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Testing the methods are being invoked by a cretin state', () => {
    const wrapper = mountComponent({
      component: <Pager
        borderColor={'green'}
        currentPage={0}
        setCurrentPage={mockSetCurrentPage}
        numberOfPages={3}/>,
      wrapWithProvider: false
    });

    elementShouldContainText(wrapper.find('.font-semibold.text-black'), 1);

    // Hit the prev page anv verify the number still is 1.
    clickOnElement(wrapper.find('.prev-button'));
    elementShouldContainText(wrapper.find('.font-semibold.text-black'), 1);
    expect(mockSetCurrentPage).toBeCalledTimes(0);

    // Click on the next button and verify the callback was triggered.
    clickOnElement(wrapper.find('.next-button'));
    expect(mockSetCurrentPage).toBeCalledTimes(1);

    // Change the prop and verify the second item is selected.
    wrapper.setProps({ currentPage: 1 });
    elementShouldContainText(wrapper.find('.font-semibold.text-black'), 2);

    // Clicking the next button, because this is still available.
    clickOnElement(wrapper.find('.next-button'));
    expect(mockSetCurrentPage).toBeCalledTimes(2);

    // Set the active page as the last item and verify the next button won't
    // work.
    wrapper.setProps({ currentPage: 2 });

    clickOnElement(wrapper.find('.next-button'));
    expect(mockSetCurrentPage).toBeCalledTimes(2);

    // Hit the prev button and verify the callback was triggered.
    clickOnElement(wrapper.find('.prev-button'));
    expect(mockSetCurrentPage).toBeCalledTimes(3);
  });

});
