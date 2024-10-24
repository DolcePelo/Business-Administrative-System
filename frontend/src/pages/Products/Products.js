import { useState } from "react";
import ProductList from "../../components/Products/ProductList";
import ProductForm from "../../components/Products/ProductForm";
import './Products.css';

const Products = () => {
    const [page, setPage] = useState(1);


    return (
        <div className="products-container">
            <h1>Agregar Nuevo Producto</h1>
            <ProductForm refreshProducts={() => setPage(1)} />
            <h1>Lista de Productos</h1>
            <ProductList page={page} setPage={setPage} />
        </div>
    );
};

export default Products;