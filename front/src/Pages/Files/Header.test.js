import renderer from "react-test-renderer";
import React from "react";
import Header from "./Header";

describe('File header component', () => {

  it('Testing the correct month is displayed', () => {
    const tree = renderer
      .create(<Header selectedMonth={'1_2019'}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

});
