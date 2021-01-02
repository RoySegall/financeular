import React from "react";
import {elementShouldExists, mountComponent} from "../../Tests/Utils";
import MonthsPicker from "./MonthsPicker";
import renderer from "react-test-renderer";

const months = ['1_2019', '2_2019', '3_2019', '1_2020'];
const mockSetCurrentMonth = jest.fn();
const mockSetCurrentPage = jest.fn();
const mockInfoMode = jest.fn();

describe('Month picker', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Testing the component months without a picked month', () => {
    const tree = renderer
      .create(<MonthsPicker months={months}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Testing the component months with a picked month', () => {
    const months = ['1_2019', '2_2019', '3_2019', '1_2020'];
    const tree = renderer
      .create(<MonthsPicker months={months} selectedMonth={"1_2019"}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Testing the clicking on a month', () => {
    const wrapper = mountComponent({
      component: <MonthsPicker
        months={months}
        selectedMonth={"1_2019"}
        setCurrentMonth={mockSetCurrentMonth}
        setCurrentPage={mockSetCurrentPage}
        setInfoMode={mockInfoMode}
      />
    });

    elementShouldExists(wrapper.find('.font-extrabold.text-black'), 1);

    const firstNotSelectedAnchor = wrapper.find('li')
      .not('.font-extrabold.text-black')
      .at(0)
      .find('a');

    firstNotSelectedAnchor.simulate('click');

    expect(mockSetCurrentMonth).toBeCalledWith('2_2019');
    expect(mockSetCurrentPage).toBeCalledWith(0);
    expect(mockInfoMode).toBeCalledWith('expenses');
  });

});