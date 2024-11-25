import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from './config/axiosConfig.js';
import Navbar from './components/Navbar/Navar.js';
import Home from './pages/Home/Home.js';
import Products from './pages/Products/Products.js';
import Rentals from './pages/Rentals/Rentals.js';
import Sales from './pages/Sales/Sales.js';
import Categorias from './pages/Categorias/Categorias.js';
import { ProductProvider } from './context/ProductContext.js';
// import Login from './pages/Login';

function App() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('/category');
        console.log(response.data.data);
        setCategorias(response.data.data);
      } catch (error) {
        console.error("error al obtener las categorias", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <ProductProvider>
      <Router>
        <div className="App">
          {/* Navbar que estará presente en todas las páginas */}
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products categorias={categorias} />} />
              <Route path="/rental" element={<Rentals />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/categorias" element={<Categorias categorias={categorias} setCategorias={setCategorias} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
