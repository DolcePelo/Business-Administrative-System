// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navar.js';
import Home from './pages/Home/Home.js';
import Products from './pages/Products/Products.js';
import Rentals from './pages/Rentals/Rentals.js';
// import Sales from './pages/Sales';
// import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar que estará presente en todas las páginas */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/rental" element={<Rentals />} />
          {/* <Route path="/products" element={<Sales />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
