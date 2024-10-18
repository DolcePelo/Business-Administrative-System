import { useState } from "react";
import axios from "../../config/axiosConfig.js";

const ProductForm = ({ refreshProducts }) => {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/products", formData);

            // Limpia los campos del formulario
            setFormData({
                code: "",
                name: "",
                description: "",
                price: "",
                category: "",
                stock: ""
            });

            refreshProducts();
        } catch (error) {
            console.error("Error creando el producto", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="code" placeholder="Código" value={formData.code} onChange={handleChange} required />
            <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
            <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} />
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
            <button type="submit">Crear Producto</button>
        </form>
    );
};

export default ProductForm;