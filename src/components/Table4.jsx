import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';

const Table4 = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      var fakeServer = createFakeServer(data);
      var datasource = createServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
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
    <div >
      <div
        id="myGrid"
        style={{
          height: '700px',
          width: '780px',
          zIndex:1000
        }}
        className="ag-theme-alpine-dark"
      >
        <AgGridReact
          modules={[ServerSideRowModelModule]}
          defaultColDef={{
            flex: 1,
           minWidth: 100,
          }}
          rowModelType={'serverSide'}
          serverSideStoreType={'full'}
          onGridReady={onGridReady}
        //   pagination={ true}
        //   paginationPageSize= {10}
        >
          <AgGridColumn field="athlete" minWidth={220} />
          <AgGridColumn field="country" minWidth={200} />
          <AgGridColumn field="year" />
          <AgGridColumn field="sport" minWidth={200} />
          <AgGridColumn field="gold" />
          <AgGridColumn field="silver" />
          <AgGridColumn field="bronze" />
        </AgGridReact>
      </div>
    </div>
  );
};


function createServerSideDatasource(server) {
    return {
      getRows: function (params) {
        console.log(
          '[Datasource] - rows requested by grid: startRow = ' +
            params.request.startRow +
            ', endRow = ' +
            params.request.endRow
        );
        var response = server.getData(params.request);
        setTimeout(function () {
          if (response.success) {
            params.success({
              rowData: response.rows,
              rowCount: response.lastRow,
            });
          } else {
            params.fail();
          }
        }, 1000);
      },
    };
  }
  function createFakeServer(allData) {
    return {
      getData: function (request) {
        var requestedRows = allData.slice(request.startRow, request.endRow);
        var lastRow = getLastRowIndex(request, requestedRows);
        return {
          success: true,
          rows: requestedRows,
          lastRow: lastRow,
        };
      },
    };
  }
  function getLastRowIndex(request, results) {
    if (!results) return undefined;
    var currentLastRow = request.startRow + results.length;
    return currentLastRow < request.endRow ? currentLastRow : undefined;
  }

  export default Table4;
  