import { useEffect, useState, useCallback } from "react";
import axios from '../../config/axiosConfig.js';
import Swal from "sweetalert2";

const ProductList = ({ page, setPage }) => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [showStockFields, setShowStockFields] = useState({});
    const [stockToAdd, setStockToAdd] = useState({});

    // Función para eliminar un producto
    const deleteProduct = async (productId, productName) => {
        const result = 
        await Swal.fire({
            title: '¿Estás seguro de eliminar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/products/${productId}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                    text: `El producto ${productName} ha sido eliminado correctamente.`,
                })
                // Después de borrar, refrescamos la lista de productos
                fetchProducts();
            } catch (error) {
                console.error("Error al borrar el producto", error);
            }
        } else {
            Swal.fire('Eliminación cancelada', '', 'info');
        }
    };

    // Traer los productos
    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`/products?page=${page}`);
            setProducts(response.data.data.docs);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error("Error al obtener los productos", error);
        }
    }, [page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const nextPage = () => {
        if (page < totalPages) setPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage(prevPage => prevPage - 1);
    };

    // Función para manejar el click en el botón "Agregar Stock"
    const toggleStockField = (productId) => {
        setShowStockFields(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    const handleStockSubmit = async (productId, e) => {
        e.preventDefault();
        const stockAmount = parseInt(stockToAdd[productId], 10) || 0;
        try {
            await axios.put(`/products/${productId}/stock`, { stock: stockAmount });
            alert(`Stock actualizado para el producto con ID: ${productId}`);
            fetchProducts();
            setStockToAdd(prev => ({ ...prev, [productId]: "" }));
        } catch (error) {
            console.error("Error al actualizar el stock", error);
        }
    };

    const handleStockChange = (productId, e) => {
        const value = e.target.value;
        setStockToAdd(prev => ({ ...prev, [productId]: value }));
    };

    return (
        <div className="product-list-container">
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.code} - {product.name} - ${product.price} - Stock: {product.stock} 
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}> {/* Contenedor para botones a la derecha */}
                            <button onClick={() => deleteProduct(product._id, product.name)}>Borrar</button>
                            <button onClick={() => toggleStockField(product._id)}>
                                {showStockFields[product._id] ? "Ocultar Stock" : "Agregar Stock"}
                            </button>
                        </div>
                        {showStockFields[product._id] && ( // Mostrar campo de entrada solo si es visible
                            <form className="stockField" style={{ display: 'inline-block' }} onSubmit={(e) => handleStockSubmit(product._id, e)}>
                                <div>
                                    <label htmlFor="stock">Stock:</label>
                                    <input type="number"
                                        id="stock"
                                        name="stock"
                                        value={stockToAdd[product._id]}
                                        onChange={(e) => handleStockChange(product._id, e)}
                                    />
                                    <button type="submit">OK</button>
                                </div>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
            <div className="pagination-container">
                <button onClick={prevPage} disabled={page === 1}>Anterior</button>
                <span>Pagina {page} de {totalPages}</span>
                <button onClick={nextPage} disabled={page === totalPages}>Siguiente</button>
            </div>
        </div>
    );
};

export default ProductList;
