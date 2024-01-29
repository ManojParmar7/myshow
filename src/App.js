import {useContext} from 'react'
import Routes from "./routes/index"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ShowsContext from "./context/shows/showsContext";
function App() {
  const { darkMode } = useContext(ShowsContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  return (
    <div>
      
      <ThemeProvider theme={theme}>
      <CssBaseline /><Routes/>
      
      </ThemeProvider></div>
  )
}

export default App