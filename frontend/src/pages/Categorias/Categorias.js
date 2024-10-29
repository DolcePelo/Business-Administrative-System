import { useState } from 'react';
import './Categorias.css';
import axios from '../../config/axiosConfig.js';
import Swal from "sweetalert2";

const Categorias = ({ categorias, setCategorias }) => {
    const [categoria, setCategoria] = useState("");

    const handleChange = (e) => {
        setCategoria(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/category', { name: categoria });
            setCategorias([...categorias, response.data.data]);
            setCategoria("");
            Swal.fire({
                position: 'top-end',
                title: 'Categoria creada con exito',
                icon: 'success',
                timer: 1500,
            });

        } catch (error) {
            console.error("error al crear la categoria", error);
        }
    }

    const deleteCat = async (catId, catName) => {
        const result = 
        await Swal.fire({
            title: '¿Estás seguro de eliminar la categoria?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/category/${catId}`);
                setCategorias(categorias.filter((cat) => cat._id !== catId));
                Swal.fire({
                    icon: 'success',
                    title: 'Categoria eliminada con exito',
                    text: `La categoria ${catName} ha sido eliminado correctamente.`,
                })
            } catch (error) {
                console.error("error al borrar la categoria", error);
            }
        } else {
            Swal.fire('Eliminación cancelada', '', 'info');
        }
    }

    return (
        <div className="categorias-container">
            <h1>Categorias</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="categoria"
                    placeholder="Nombre de la categoria"
                    value={categoria}
                    onChange={handleChange}
                />
                <button type="submit">Agregar</button>
            </form>
            <ul>
                {categorias.map(cat => (
                    <li key={cat._id}>{cat.name}
                        <button onClick={() => deleteCat(cat._id, cat.name)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Categorias;