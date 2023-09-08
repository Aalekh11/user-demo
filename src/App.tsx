import { createContext, useContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header";
import DefinedRoutes from "./routes";

export const ThemeContext = createContext(1);

function App() {
  return (
    <BrowserRouter>
    <ThemeContext.Provider value={Math.floor(Math.random() * 10)}>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Header />
        <DefinedRoutes/>
      </div>
    </div>
    </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
