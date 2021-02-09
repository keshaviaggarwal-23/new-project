// import React, { useState, useEffect } from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
// import axios from "axios";
// const Table3 = () => {
//  // const [gridApi, setGridApi] = useState(null);
//   const [columnDefs, setColumnDefs] = useState([
//     { headerName: "Title", field: "title" },
//     { headerName: "Release Date", field: "Release Date", filter: "true" },
//     {
//       headerName: "Major Genre",
//       field: "Major Genre",
     
//     },
//   ]);
//   const [data, setData] = useState([]);
//   const getData = () => {
//     fetch(
//       "https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       }
//     )
//       .then(function (response) {
//         console.log(response);
//         return response.json();
//       })
//       .then(function (myJson) {
//         console.log(myJson);
//         setData(myJson);
//       })
//       .catch((err) => console.log(err));
//   };
//   useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <div className="ag-theme-alpine-dark" style={{ height: 500, width: 600 }}>
//       <AgGridReact
//         rowSelection="multiple"
//         animateRows
//         columnDefs={columnDefs}
//         rowData={data}
//       />
//     </div>
//   );
// };

// export default Table3;
import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

const Table3 = () => {
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
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          modules={AllCommunityModules}
          defaultColDef={{
            width: 170,
            sortable: true,
          }}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn field="athlete" sort="desc" />
          <AgGridColumn field="age" width={90} />
          <AgGridColumn field="country" />
          <AgGridColumn field="year" width={90} unSortIcon={true} />
          <AgGridColumn field="date" comparator={dateComparator} />
          <AgGridColumn field="sport" />
          <AgGridColumn field="gold" />
          <AgGridColumn field="silver" />
          <AgGridColumn field="bronze" />
          <AgGridColumn field="total" />
        </AgGridReact>
      </div>
    </div>
  );
};
export default Table3;

// function dateComparator(date1, date2) {
//   var date1Number = monthToComparableNumber(date1);
//   var date2Number = monthToComparableNumber(date2);
//   if (date1Number === null && date2Number === null) {
//     return 0;
//   }
//   if (date1Number === null) {
//     return -1;
//   }
//   if (date2Number === null) {
//     return 1;
//   }
//   return date1Number - date2Number;
// }
// function monthToComparableNumber(date) {
//   if (date === undefined || date === null || date.length !== 10) {
//     return null;
//   }
//   var yearNumber = date.substring(6, 10);
//   var monthNumber = date.substring(3, 5);
//   var dayNumber = date.substring(0, 2);
//   var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
//   return result;
// }

// render(<GridExample></GridExample>, document.querySelector('#root'));