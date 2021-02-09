import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import axios from "axios";

const Table = () => {
 // const [gridApi, setGridApi] = useState(null);

  const [columnDefs, setColumnDefs] = useState([
    
    { headerName: "Title", field: "title" },
    { headerName: "Artist", field: "artist", filter: "true" },
    { headerName: "Year", field: "year", sortable: "true", filter: "true" },
  ]);
  const [data, setData] = useState([]);
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
        className="ag-theme-alpine-dark "
        style={{ height: 500, width: 600 }}
      >
        <AgGridReact
          rowSelection="multiple"
          animateRows
          columnDefs={columnDefs}
          rowData={data}
        />
      </div>
    </div>
  );
};

export default Table;
