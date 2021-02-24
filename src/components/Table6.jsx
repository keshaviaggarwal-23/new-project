import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

class Table6 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: [
        ClientSideRowModelModule,
        RowGroupingModule,
        MenuModule,
        ColumnsToolPanelModule,
        FiltersToolPanelModule,
      ],
      columnDefs: [
        {
          field: 'country',
          rowGroup: true,
        },
        {
          field: 'athlete',
          rowGroup: true,
        },
        {
          headerName: 'Year',
          valueGetter: 'data.year',
          pivot: true,
        },
        {
          field: 'gold',
          aggFunc: 'sum',
        },
        {
          field: 'silver',
          aggFunc: 'sum',
        },
        {
          field: 'bronze',
          aggFunc: 'sum',
        },
        {
          field: 'total',
          aggFunc: 'sum',
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        filter: true,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: { minWidth: 250 },
      groupDefaultExpanded: 9,
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  render() {
    return (
   
       <div style={{ width: '100%', height: '100%' }}>
      <div className="test-container">
          <div
            id="myGrid"
            style={{
                height: '700px',
                width: '825px',
              }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              modules={this.state.modules}
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              pivotMode={true}
              groupDefaultExpanded={this.state.groupDefaultExpanded}
              groupHideOpenParents={true}
              groupMultiAutoColumn={true}
              animateRows={true}
              sideBar={true}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
          </div>
          </div>
       
    
     
    );
  }
}

export default Table6;

