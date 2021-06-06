import Theme from './theme/Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Router } from "./common/Router";
import { initialState, SearchSettingsContext } from "./SearchPage/searchComponents/SearchSettingsContext";

function App() {

  return (
      <div className="App">
        <div className = "content">
          <ThemeProvider theme={Theme}>
            <SearchSettingsContext.Provider value={initialState}>
              <Router />
            </SearchSettingsContext.Provider>
          </ThemeProvider>
        </div>
      </div>
  );
}


export default App;
