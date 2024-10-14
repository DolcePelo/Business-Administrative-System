// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navar.js';
import Home from './pages/Home/Home.js';
import Products from './pages/Products/Products.js';
// import Sales from './pages/Sales';
// import Rentals from './pages/Rentals';
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
          {/* <Route path="/products" element={<Sales />} /> */}
          {/* <Route path="/products" element={<Rentals />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
