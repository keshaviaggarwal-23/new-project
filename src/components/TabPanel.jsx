import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "./Table";
import Table2 from "./Table2";
import Table3 from "./Table3";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap:'wrap',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor:'#111340'
  },
}));
export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
        style={{backgroundColor: '#111340'}}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Songs" {...a11yProps(0)} />
          <Tab label="Cars" {...a11yProps(1)} />
          <Tab label="Athletes" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
            <Table />
        
      </TabPanel>
      <TabPanel  value={value} index={1}>
        <Table2 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Table3 />
      </TabPanel>
    </div>
  );
}
