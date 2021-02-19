import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Table5 = () => {
  const classes = useStyles();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const onExportClick=()=>{
    gridApi.exportDataAsCsv();
   
  }

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
       <Button
        variant="contained"
        color="grey"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
       
       
        onClick={() => onExportClick()}
      >
        Export
      </Button>
      <div
        id="myGrid"
        style={{ height: 700, width: 800 }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          modules={[
            ClientSideRowModelModule,
            RowGroupingModule,
            MenuModule,
            ColumnsToolPanelModule,
            SetFilterModule,
          ]}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            filter: true,
            sortable: true,
            resizable: true,
          }}
          autoGroupColumnDef={{ minWidth: 200 }}
          enableRangeSelection={true}
          animateRows={true}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn field="country" rowGroup={true} hide={true} />
          <AgGridColumn field="year" rowGroup={true} hide={true} />
          <AgGridColumn field="sport" minWidth={200} />
          <AgGridColumn field="athlete" minWidth={200} />
          <AgGridColumn field="gold"  />
          <AgGridColumn field="silver" />
          <AgGridColumn field="bronze" />
          <AgGridColumn field="total" />
        
        </AgGridReact>
      </div>
     
    </div>
  );
};

export default Table5;