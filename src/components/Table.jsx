import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Table = () => {
  const classes = useStyles();
 
  const [columnDefs, setColumnDefs] = useState([
    
    { headerName: "Artist", field: "artist", rowGroup:true},
    { headerName: "Title", field: "title",  rowGroup:true},
    { headerName: "Year", field: "year", sortable:true,  cellStyle:(params)=>(params.data.year%2==0 ? {color:"black", background:"coral"}: null),
   },
    { headerName: "Web Url", field: "web_url",  rowGroup:true},
  ]);
  const [data, setData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const onGridReady = params => {
    setGridApi(params.api);
  
  }
  const onExportClick=()=>{
    gridApi.exportDataAsCsv();
   
  }
 
  const getData = () => {
    fetch("/jakeworry/017%20JSON%20Grouping,%20part%203/data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson.songs);
      })
      .catch((err) => console.log(err));
  };
 

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
     
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
        className="ag-theme-alpine"
        style={{ height: "700px", width: "590px" }}
      >
        <AgGridReact
         modules={[
          ClientSideRowModelModule,
          RowGroupingModule,
          MenuModule,
          // ColumnsToolPanelModule,
          // FiltersToolPanelModule,
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
       
          rowSelection="multiple"
          animateRows
          columnDefs={columnDefs}
          rowData={data}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={9}
          
        />
      </div>
     
    </div>
  );
};

export default Table;
