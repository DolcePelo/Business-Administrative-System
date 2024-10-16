import { useState } from "react";
import axios from '../../config/axiosConfig.js';

const Sales = () => {
    const [sales, setSales] = useState([]);
    
    const generateSale = async () => {
        try {
            const response = await axios.post('/sales');
            setSales(response.data.data);
            console.log("Venta generada exitosamente", response.data.data);
        } catch (error) {
            console.error("Error al generar la venta", error)
        }
    };

    return(
        <div>
            <button onClick={generateSale}>Generar Venta</button>
            {sales ? (
                <div>
                    <h3>Detalles de la Venta:</h3>
                    <p>{`ID: ${sales._id}`}</p>
                    <p>{`Estado: ${sales.status}`}</p>
                    <p>{`Total: ${sales.total}`}</p>
                    {/* Añade más detalles según lo que quieras mostrar */}
                </div>
            ) : (
                <p>No se ha generado ninguna venta aún.</p>
            )}
        </div>
    )
}

export default Sales 