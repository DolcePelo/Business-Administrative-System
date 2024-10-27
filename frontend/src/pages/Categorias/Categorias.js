import { useState, useEffect } from 'react';
import './Categorias.css';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState("");

    const handleChange = (e) => {
        setCategoria(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCategorias([...categorias, categoria]);
        setCategoria("");
    }

    const deleteCat = (index) => {
        setCategorias(categorias.filter((cat, i) => i !== index));
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
                {categorias.map((cat, index) => (
                    <li key={index}>{cat}
                    <button onClick={() => deleteCat(index)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Categorias;