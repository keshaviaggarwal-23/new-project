import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Table = () => {
  const classes = useStyles();
 
  const [columnDefs, setColumnDefs] = useState([
    
    { headerName: "Title", field: "title" },
    { headerName: "Artist", field: "artist", filter:true },
    { headerName: "Year", field: "year", sortable:true, filter: true , cellStyle:(params)=>(params.data.year%2==0 ? {color:"black", background:"coral"}: null)},
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
      <div
        className="ag-theme-alpine"
        style={{ height: 500, width: 550 }}
      >
        <AgGridReact
          rowSelection="multiple"
          animateRows
          columnDefs={columnDefs}
          rowData={data}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={9}
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

export default Table;
