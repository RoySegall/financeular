import renderer from "react-test-renderer";
import React from "react";
import Pager from "./Pager";

describe('Pager component', () => {

  it('Snap shot the component', () => {
    const tree = renderer
      .create(<Pager
        borderColor={'green'}
        currentPage={0}
        setCurrentPage={() => {}}
        numberOfPages={20} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Testing the methods are being invoked by a cretin state', () => {
    expect(1).toBe(2);
  });

});
