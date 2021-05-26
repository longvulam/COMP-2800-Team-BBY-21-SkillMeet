import React from "react";

import Theme from './theme/Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Router } from "./common/Router";
function App() {

  return (
      <div className="App">
        <div className = "content" style={styles.content}>
        <ThemeProvider theme={Theme}>
          <Router />
        </ThemeProvider>
        </div>
      </div>
  );
}

const styles = {
    content: {
        height: '100vh',
    }
}

export default App;
