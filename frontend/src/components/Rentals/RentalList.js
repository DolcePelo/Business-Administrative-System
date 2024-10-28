import { useEffect, useState } from "react";
import axios from '../../config/axiosConfig.js';
import Swal from "sweetalert2";

const RentalList = ({ page, setPage, refreshCourts }) => {
    const [rentals, setRentals] = useState([]);
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

    const deleteRental = async (rentalId, rentalName, courtNumber) => {
        const result = 
        await Swal.fire({
            title: '¿Estás seguro de eliminar la cancha?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });
        
        if (result.isConfirmed) {
            try {
                await axios.delete(`/rental/${rentalId}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Cancha eliminada',
                    text: `${rentalName} ${courtNumber} ha sido eliminada correctamente.`,
                })
                refreshCourts();
            } catch (error) {
                console.error("Error al obtener las canchas", error);
            }
        } else {
            Swal.fire('Eliminación cancelada', '', 'info');
        }
    }

    return (
        <div className="rental-list-container">
            <ul>
                {rentals.map(rental => (
                    <li key={rental._id}>
                        <h3>{rental.courtType} - Cancha N° {rental.courtNumber}</h3>
                        {rental.priceRanges.map((range, index) => (
                            <div key={index}>
                                <ul>
                                    <h4>{range.startTime} - {range.endTime}</h4>
                                    {/* Solo muestra los precios si al menos uno existe */}
                                    {(range.prices.price60 || range.prices.price90 || range.prices.price120) ? (
                                        <p><strong>Precios:</strong></p>
                                    ) : null}
                                    {range.prices.price60 && <li>60 min: ${range.prices.price60}</li>}
                                    {range.prices.price90 && <li>90 min: ${range.prices.price90}</li>}
                                    {range.prices.price120 && <li>120 min: ${range.prices.price120}</li>}
                                </ul>
                            </div>
                        ))}
                        <button onClick={() => deleteRental(rental._id, rental.courtType, rental.courtNumber)}>Borrar</button>
                    </li>
                ))}
            </ul>
            <div className="pagination-container">
                <button onClick={prevPage} disabled={page === 1}>Anterior</button>
                <span>Pagina {page} de {totalPages}</span>
                <button onClick={nextPage} disabled={page === totalPages}>Siguiente</button>
            </div>
        </div>
    )
};

export default RentalList;