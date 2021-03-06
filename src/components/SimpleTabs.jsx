import React,{useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "./Table";
import Table2 from "./Table2";
import Table4 from "./Table4";
import ServerTable from "./ServerTable";
import Table5 from "./Table5";
import Table6 from "./Table6";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../reducers/gridActions";
// import {actions} from "../reducers/action/gridAction";



function TabPanel(props) {
  const { children, value, index, ...other} = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
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
    backgroundColor:'#ffffff'
  },
}));
export default function SimpleTabs() {
  // const index = useSelector((state) => getCurrentViewTabIndex(state));
  // const allGrids = useSelector((state,gridId) => getGridById(state, gridId));
  // const dispatch = useDispatch();
  // const[toggle,setToggle]=useState(false)

  //const tab = mapAllGridsToTabs(allGrids, classes);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    //dispatch(actions.changeTab(newValue));
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
          <Tab label="Olympics" {...a11yProps(1)} />
           <Tab label="Athletes" {...a11yProps(2)} />
           {/* <Tab label="Athletes More" {...a11yProps(3)} /> */}
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}  >
            <Table  id={0}/>
        
      </TabPanel>
      <TabPanel  value={value} index={1}>
        <Table6 id={1} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Table2 id={2} />
       
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        <Table2/>
      </TabPanel> */}
    </div>
  );
}
