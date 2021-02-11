import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { CSVLink, CSVDownload } from "react-csv";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
const Table3 = () => {
  const classes = useStyles();
 
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "", field: "", checkboxSelection:true},
    { headerName: "Athlete", field: "athlete", filter: true },
    { headerName: "Age", field: "age", sortable:true},
    {
      headerName: "Country",
      field: "country",filter: true
     
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
 
 
   
  const [rowData, setRowData] = useState([]);
 

  const onGridReady = params => {
    setGridApi(params.api);
  
  }
  const onExportClick=()=>{
    gridApi.exportDataAsCsv();
  }
 

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
  return (
    <div>
    
    
    <div className="ag-theme-alpine-dark" style={{height: 700, width: 550 }}>
      <AgGridReact
        rowSelection="multiple"
        animateRows
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
      />
    </div>
    <div style={{textAlign:"center"}}>
    <Button
        variant="contained"
        color="grey"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
       
        onClick={() => onExportClick()}
      >
        Export
      </Button>
      </div>
    </div>
  );
};


export default Table3;
