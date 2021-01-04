import renderer from "react-test-renderer";
import React from "react";
import UpperSection from "./UpperSection";

describe('Upper section component', () => {

  it('Snap shot the component', () => {
    const tree = renderer
      .create(<UpperSection
        infoBoxTitle={'foo'}
        infoBoxColor={'bar'}
        infoBoxIcon={'foobar'}
        balance={23}
        setInfoMode={() => {}}
        totalExpenses={11}
        totalIncomes={22}
        width={33}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
