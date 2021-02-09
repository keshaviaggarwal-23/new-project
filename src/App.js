
import './App.css';
import React, { useState} from "react";
import Table from "./components/Table"
import Container from '@material-ui/core/Container';
import TabPanel from "./components/TabPanel";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NavBar from "./components/Navbar";

import Table2 from "./components/Table2"
const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});
function App() {
  const [light, setLight] = useState(true);
  return (
    
    <div >
      <MuiThemeProvider theme={themeDark}>
    <CssBaseline />
      {/* <NavBar /> */}
      <TabPanel/>
  
      <footer >
        <div>
          <big>PIMCO</big> Abs Structured Products
        </div>
        <div>Home</div>
        <div>BETA powered by PIMgrid</div>
      </footer>
    
      </MuiThemeProvider>
     
   
     
         
       
    </div>
  );
}

export default App;
