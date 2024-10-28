import { useState } from "react";
import axios from "../../config/axiosConfig.js";
import Swal from "sweetalert2";

const ProductForm = ({ categorias, refreshProducts }) => {
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
            Swal.fire({
                title: "Producto creado con éxito",
                text: "El producto ha sido creado con éxito",
                icon: "success",
            })
        } catch (error) {
            console.error("Error creando el producto", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="products-fields-container">
            <div>
                <label htmlFor="code">Código:</label>
                <input
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Código"
                    value={formData.code}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Descripción:</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Descripción"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="price">Precio: $</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Precio"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="category">Categoría:</label>
                <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    name="stock"
                    id="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Crear Producto</button>
        </form>
    );
};

export default ProductForm;