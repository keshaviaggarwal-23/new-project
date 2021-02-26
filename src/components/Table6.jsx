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
import {debounce} from "../helpers/helpers"

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../reducers/gridActions";


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
    this.debounceSaveGridColumnState = debounce((id, columnState) => {
      this.props.actions.saveGridColumnState(id, columnState);
    }, 100);

    this.debounceSaveGridColumnGroupState = debounce((id, columnGroupState) => {
      this.props.actions.saveGridColumnGroupState(id, columnGroupState);
    }, 100);

    this.debounceSaveGridPivotModeState = debounce((id, isPivotMode) => {
      this.props.actions.saveGridPivotModeState(id, isPivotMode);
    }, 100);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // if (this.props.fetchAgain) {
    //   this.props.actions.fetchGridData('https://www.ag-grid.com/example-assets/olympic-winners.json')}
   

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

  
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };
  onFilterChanged(params) {
    let filterModel = params.api.getFilterModel();
    this.props.actions.saveGridFilterModel(this.props.id, filterModel);
  }

  onSortChanged(params) {
    let sortModel = params.api.getSortModel();
    this.props.actions.saveGridSortModel(this.props.id, sortModel);
  }

  onFirstDataRendered(params) {
    let isPivotMode = this.props?.isPivotMode; // boolean
    let isPivotModeDifferent =
      this.gridColumnApi?.isPivotMode() !== this?.props?.isPivotMode;

    let sortModel = this.props?.sortModel;
    let filterModel = this.props?.filterModel;
    let columnState = this.props?.columnState;
    let columnGroupState = this.props?.columnGroupState;

    if (this?.props?.isPivotMode !== undefined && isPivotModeDifferent) {
      this.gridColumnApi.setPivotMode(isPivotMode);
    }

    if (columnState) {
      this.gridColumnApi.setColumnState(columnState);
    }

    if (columnGroupState) {
      this.gridColumnApi.setColumnGroupState(columnGroupState);
    }

    if (sortModel) {
      this.gridApi.setSortModel(sortModel);
    }

    if (filterModel) {
      this.gridApi.setFilterModel(filterModel);
    }
  }

  onSaveGridColumnState(e) {
    if (!this.gridColumnApi) return;
    let columnState = this.gridColumnApi?.getColumnState();
    let columnGroupState = this.gridColumnApi?.getColumnGroupState();

    this.debounceSaveGridColumnState(this.props.id, columnState);
    this.debounceSaveGridColumnGroupState(this.props.id, columnGroupState);
  }

  onSavePivotModeState() {
    let isPivotMode = this.gridColumnApi.isPivotMode();

    let isPivotModeDifferentFromProps =
      this.gridColumnApi.isPivotMode() !== this.props.isPivotMode;
    if (isPivotModeDifferentFromProps)
      this.debounceSaveGridPivotModeState(this.props.id, isPivotMode);
  }

  render(id=0) {
    return (
   
       <div style={{ width: '100%', height: '100%' }}>
      <div className="test-container">
          <div
            
            style={{
                height: '700px',
                width: '590px',
              }}
            className="ag-theme-alpine"
          >
            <AgGridReact
               modules={this.state.modules}
              // columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              pivotMode={false}
              groupDefaultExpanded={this.state.groupDefaultExpanded}
              groupHideOpenParents={true}
              groupMultiAutoColumn={true}
            
               animateRows={true}
              
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              defaultColDef={this.defaultColDef}
              sideBar={true}
              
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              onGridReady={this.onGridReady.bind(this)}
            
              onFilterChanged={this.onFilterChanged.bind(this)}
              onSortChanged={this.onSortChanged.bind(this)}
              onColumnVisible={this.onSaveGridColumnState.bind(this)}
              onColumnPinned={this.onSaveGridColumnState.bind(this)}
              onColumnResized={this.onSaveGridColumnState.bind(this)}
              onColumnMoved={this.onSaveGridColumnState.bind(this)}
              onColumnRowGroupChanged={this.onSaveGridColumnState.bind(this)}
              onColumnValueChanged={this.onSaveGridColumnState.bind(this)}
              onColumnPivotChanged={this.onSaveGridColumnState.bind(this)}
              onColumnPivotModeChanged={this.onSavePivotModeState.bind(this)}
              
            />
          </div>
          </div>
          </div>
       
    
     
    );
  }
}
// const mapStateToProps = (state) => ({
//   currentViewInfo: state.currentViewInfo,
// });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect( null,mapDispatchToProps)(Table6);

