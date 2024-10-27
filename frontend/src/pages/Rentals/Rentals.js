import { useState } from "react";
import RentalList from "../../components/Rentals/RentalList";
import RentalForm from "../../components/Rentals/RentalForm";
import './Rental.css';


const Rentals = () => {
    const [page, setPage] = useState(1);
    

    return (
        <div className="rental-container">
            <h1>Agregar Nueva Cancha</h1>
            <RentalForm refreshCourts={() => setPage(1)}  />
            <h1>Lista de Canchas</h1>
            <RentalList page={page} setPage={setPage} refreshCourts={() => setPage(1)}/>
        </div>
    );
};

export default Rentals;