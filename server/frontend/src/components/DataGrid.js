import * as React from 'react';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarContainer, GridToolbarDensitySelector
} from '@mui/x-data-grid';
import {Button} from "@mui/material";
import {Context} from "../Context"
import {useContext} from "react";
import {useHistory, useNavigate} from "react-router-dom";
import axios from "axios";

export default function DataGridAC(props) {

  let shownData = []
  let hiddenColumns = []
  let history = useHistory()
  const [context, setContext] = useContext(Context)

  function getColumns(){
    let columnsArray = []
    Object.keys(props.data[0]).forEach(el => {
      columnsArray.push({field: el, headerName: el})
    })
    return columnsArray
  }

  function getRows(){
    return props.data.map((obj, i) => {
      return { id: i + 1, ...obj };
    })
  }

  function setResultColumns(params) {
    let hiddenCol = [];
    getColumns().forEach((col) => {
      if (params[col.field] === false)
        hiddenCol.push(col.field)
    })
    hiddenColumns = hiddenCol
    let shownDataTemp = JSON.parse(JSON.stringify(props.data))
    shownDataTemp.forEach(el => {
      hiddenColumns.forEach(field => {
        delete el[field]
      })
    })
    shownData = shownDataTemp
  }

  async function handleUploadData(){
    await fetch('api/upload-file', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shownData)
    }).then((response) => {
      return response.json()
    }).then(data => {
      setContext(data)
      history.push({pathname: '/chart'})
    })

  }

  function CustomToolbar() {
    return (
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarExport printOptions={{ disableToolbarButton: true }}/>
          <GridToolbarDensitySelector/>
          <Button variant="contained"
                  onClick={handleUploadData}
                  style={{
                    width: 130,
                    height:30
                  }}
          >
            Upload data
          </Button>
        </GridToolbarContainer>
    );
  }

  return (
      <div style={{height: 400, width: "auto"}}>
        <DataGrid
            rows={getRows()}
            columns={getColumns()}
            disableColumnMenu={true}
            disableExtendRowFullWidth={false}
            components={{
              Toolbar: CustomToolbar,
            }}
            onColumnVisibilityModelChange={(params) => {
              setResultColumns(params)
            }}
        />
      </div>
  );
}