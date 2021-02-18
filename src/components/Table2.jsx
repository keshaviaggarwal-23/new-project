
import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

const Table2 = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      setRowData(data);
    };

    httpRequest.open(
      'GET',
      'https://www.ag-grid.com/example-assets/olympic-winners.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="test-container">
        <div className="test-header">
          <span className="legend-item ag-row-level-0"></span>
          <span className="legend-label">
            Top Level Group (After collapsing)
          </span>
          <span className="legend-item ag-row-level-1"></span>
          <span className="legend-label">Second Level Group</span>
        </div>
        <div
          id="myGrid"
          style={{
            height: '700px',
            width: '825px',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            modules={[
              ClientSideRowModelModule,
              RowGroupingModule,
              MenuModule,
              ColumnsToolPanelModule,
              FiltersToolPanelModule,
            ]}
            defaultColDef={{
              flex: 1,
              minWidth: 150,
              enableRowGroup: true,
              enablePivot: true,
              enableValue: true,
              filter: true,
              resizable: true,
              sortable: true,
            }}
            autoGroupColumnDef={{ minWidth: 250 }}
            pivotMode={true}
            groupDefaultExpanded={9}
            groupHideOpenParents={true}
            groupMultiAutoColumn={true}
            animateRows={true}
            sideBar={true}
            onGridReady={onGridReady}
            rowData={rowData}
          >
            <AgGridColumn field="country" rowGroup={true} />
            <AgGridColumn field="athlete" rowGroup={true} />
            <AgGridColumn
              headerName="Year"
              valueGetter="data.year"
              pivot={true}
            />
            <AgGridColumn field="gold" aggFunc="sum" />
            <AgGridColumn field="silver" aggFunc="sum" />
            <AgGridColumn field="bronze" aggFunc="sum" />
            <AgGridColumn field="total" aggFunc="sum" />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};
export default Table2;