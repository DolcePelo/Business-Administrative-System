import { useEffect, useState } from "react";
import axios from '../../config/axiosConfig.js';

const Rentals = () => {
    const [rentals, setRentals] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await axios.get(`/rental?page=${page}`);
                console.log(response.data.data);
                setRentals(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            } catch (error) {
                console.error("Error al obtener los alquileres", error);
            }
        };
        fetchRentals();
    }, [page]); //el efecto se ejecuta al obtener el producto

    const nextPage = () => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div>
            <h1>Lista de Canchas</h1>
            <ul>
                {rentals.map(rental => (
                    <li key={rental._id}>
                        <h3>{rental.courtType} - Cancha N° {rental.courtNumber}</h3>
                        {rental.priceRanges.map((range, index) => (
                            <div key={index}>
                                <ul>
                                    {range.prices.price60 && <li>60 min: ${range.prices.price60}</li>}
                                    {range.prices.price90 && <li>90 min: ${range.prices.price90}</li>}
                                    {range.prices.price120 && <li>120 min: ${range.prices.price120}</li>}
                                </ul>
                                {/* Solo muestra los precios si al menos uno existe */}
                                {(range.prices.price60 || range.prices.price90 || range.prices.price120) ? (
                                    <p><strong>Precios:</strong></p>
                                ) : null}
                            </div>
                        ))}
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

export default Rentals;