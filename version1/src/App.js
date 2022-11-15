import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from '@mantine/core';

import './App.css';
import Home from './pages/Home';
import Market from "./pages/Market";
import AboutUs from "./pages/AboutUs";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Navbar />
        <div className="max-auto pt-20">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/market' element={<Market />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/cart' element={<Cart />}/>
            <Route path='/checkout' element={<Checkout />}/>
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
