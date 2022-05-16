import React, {useState, CSSProperties, useCallback} from 'react'
import SwipeableViews from 'react-swipeable-views'
import {useTheme} from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabPanel from './TabPanel'
import DataGridAC from "./DataGrid"
import CSVReader from "./CSVReader";
import {Button, Input} from "@mui/material";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function HomePage() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [tableData, setTableData] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
      <Box sx={{bgcolor: 'background.paper'}}>
        <AppBar position="static">
          <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
          >
            <Tab label="Files" {...a11yProps(0)} />
            <Tab label="Databases" {...a11yProps(1)} />
            <Tab label="APIs" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <CSVReader setData={setTableData}/>
            {
              tableData ?
                  <DataGridAC data={tableData.data}/>
                  :<></>
            }

          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div>
              <Input placeholder="Connection string"/>
            </div>
            <div>
              <Input placeholder="Table name"/>
            </div>
            <div>
              <Button variant="contained">UPLOAD DATA</Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div>
              <Input placeholder="API URL"/>
            </div>
            <div>
              <Button variant="contained">UPLOAD DATA</Button>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
  );
}