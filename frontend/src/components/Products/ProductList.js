import { useState } from "react";
import { useProductContext } from "../../context/ProductContext";


const ProductList = () => {
    const { products, page, totalPages, setPage, deleteProduct, updateStock } = useProductContext();
    const [showStockFields, setShowStockFields] = useState({});
    const [stockToAdd, setStockToAdd] = useState({});

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
        await updateStock(productId, stockAmount);
        setStockToAdd(prev => ({ ...prev, [productId]: "" }));
    };

    const handleStockChange = (productId, e) => {
        const value = e.target.value;
        setStockToAdd(prev => ({ ...prev, [productId]: value }));
    };

    const nextPage = () => {
        if (page < totalPages) setPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage(prevPage => prevPage - 1);
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
