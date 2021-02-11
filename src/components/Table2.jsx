import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import axios from 'axios';


const Table2=()=>{
    const [gridApi, setGridApi] = useState(null);
  

   
const [columnDefs,setColumnDefs]=useState([
        // { headerName: 'UserId', field: 'userId',checkboxSelection:'true'  },
        // { headerName: 'ID', field: 'id' ,sortable:'true',filter:'true', },
        // { headerName: 'Title', field: 'title' , filter:'true' },
        { headerName: 'Make', field: 'make', filter: true },
        { headerName: 'Model', field: 'model',filter:'true' ,filter: true},
        { headerName: 'Price', field: 'price',sortable:'true',filter:true },
        // {headerName:'Body', field:'body'},
        // { headerName: 'State', field: 'State' },
        // { headerName: 'Confirmed', field: 'Confirmed' },
        // { headerName: 'Recovered', field: 'Recovered' },
      

    ])
   
   

    // const componentDidMount=()=>{
    //     fetch("https://api.covid19india.org/csv/latest/state_wise")
    //     // fetch("https://jsonplaceholder.typicode.com/posts")
    //     .then(res=>res.json())
    //     .then(rowData=>setRowData({rowData}))
    //     .catch(err=>console.log(err));
    // }

    const [rowData,setRowData]=useState([]);
  //   const getData=()=>{

  //     fetch('https://jsonplaceholder.typicode.com/posts',
  // //  fetch('https://github.com/bvaughn/infinite-list-reflow-examples/blob/master/books.json',
  //     {
  //       headers : { 
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'Access-Control-Allow-Origin':'*'

  //        }
  //     }
  //     )
  //       .then(function(response){
  //         console.log(response)
  //         return response.json();
  //       })
  //       .then(function(myJson) {
  //         console.log(myJson);
  //         setData(myJson)
  //       }).catch(err=>console.log(err));

  
  //   }


  //   useEffect(()=>{
  //     getData()
  //   },[])
  const httpRequest = new XMLHttpRequest();
  const updateData = (data) => {
    setRowData(data);
  };

  httpRequest.open(
    'GET',
    'https://www.ag-grid.com/example-assets/row-data.json'
  );
  httpRequest.send();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      updateData(JSON.parse(httpRequest.responseText));
    }
  };

   
 return(
        <div className="ag-theme-alpine-dark"
            style={{height: 700, width: 550}}
           
            >
                 
                <AgGridReact
                 rowSelection="multiple"
                 animateRows
                columnDefs={columnDefs}
                rowData={rowData}
                />

        </div>
    )


}

export default Table2;