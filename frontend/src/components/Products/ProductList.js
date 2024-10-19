import { useEffect, useState } from "react";
import axios from '../../config/axiosConfig.js';

const ProductList = ({ page, setPage }) => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Función para eliminar un producto
    const deleteProduct = async (productId, productName) => {
        try {
            await axios.delete(`/products/${productId}`);
            alert(`${productName} eliminado de la base de datos`)
            // Después de borrar, refrescamos la lista de productos
            fetchProducts();
        } catch (error) {
            console.error("Error al borrar el producto", error);
        }
    };

    // Traer los productos
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/products?page=${page}`);
            setProducts(response.data.data.docs);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error("Error al obtener los productos", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const nextPage = () => {
        if (page < totalPages) setPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage(prevPage => prevPage - 1);
    };

    return (
        <div>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.code} - {product.name} - ${product.price} : <button onClick={() => deleteProduct(product._id, product.name)}>Borrar</button>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={prevPage} disabled={page === 1}>Anterior</button>
                <span>Pagina {page} de {totalPages}</span>
                <button onClick={nextPage} disabled={page === totalPages}>Siguiente</button>
            </div>
        </div>
    );
};

export default ProductList;
