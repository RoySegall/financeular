import renderer from "react-test-renderer";
import UpperSection from "./UpperSection";
import React from "react";
import Table from "./Table";

describe('Table component', () => {

  it('Snap shot the component', () => {
    const tree = renderer
      .create(<Table
        tableHeaders={['title', 'value']}
        borderColor={'green'}
        rows={[[1,2], [2,1]]}
        tableTdWidth={2}
        perPage={1}
        currentPage={0}
        setCurrentPage={() => {}}
        infoMode={'expenses'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
