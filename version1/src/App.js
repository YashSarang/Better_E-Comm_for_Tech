import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from '@mantine/core';

import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <div className="max-w-screen-md max-auto pt-20">
          <Routes>
            <Route path='/' element={<Home />}/>
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
