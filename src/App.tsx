import React from 'react';
import { ThemeProvider, theme } from "@chakra-ui/core";
import Home from 'pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStore from 'stores/GlobalStore';
import { StoreContext } from 'stores';


function App() {
  return (
    <StoreContext.Provider value={new GlobalStore()}>
      <ThemeProvider theme={theme}>
        <Router>
          <Home/>
        </Router>
      </ThemeProvider>
    </StoreContext.Provider>
  );
}

export default App;
