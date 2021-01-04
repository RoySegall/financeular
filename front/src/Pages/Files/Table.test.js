import renderer from "react-test-renderer";
import React from "react";
import Table from "./Table";
import {elementShouldExists, mountComponent} from "../../Tests/Utils";

describe('Table component', () => {

  const mountTable = (perPage = 1) => mountComponent({component: <Table
      tableHeaders={['title', 'value']}
      borderColor={'green'}
      rows={[[1,2], [2,1]]}
      tableTdWidth={2}
      perPage={perPage}
      currentPage={0}
      setCurrentPage={() => {}}
      infoMode={'expenses'}
       />})

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

  it('Testing when the pager is visible or not', () => {
    elementShouldExists(mountTable().find('.pager'), 1);
    elementShouldExists(mountTable(10).find('.pager'), 0);
  });

});
