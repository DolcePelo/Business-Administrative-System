import { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "../config/axiosConfig.js";
import Swal from "sweetalert2";

const ProductContext = createContext();

export const useProductContext = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

    const deleteProduct = async (productId, productName) => {
        const result = await Swal.fire({
            title: "¿Estás seguro de eliminar el producto?",
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
                });
                fetchProducts();
            } catch (error) {
                console.error("Error al eliminar el producto", error);
            }
        } else {
            Swal.fire('Eliminación cancelada', '', 'info');
        }
    };

    const updateStock = async (productId, stockAmount) => {
        try {
            await axios.put(`/products/${productId}/stock`, { stock: stockAmount });
            Swal.fire('Stock actualizado', '', 'success');
            fetchProducts();
        } catch (error) {
            console.error("Error al actualizar el stock", error);
            Swal.fire('Error', 'No se pudo actualizar el stock', 'error');
        }
    };

    //valores proporcionados por el contexto
    const value = {
        products,
        page,
        totalPages,
        setPage,
        fetchProducts,
        deleteProduct,
        updateStock,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};