import { useState } from "react";
import RentalList from "../../components/Rentals/RentalList";
import RentalForm from "../../components/Rentals/RentalForm";


const Rentals = () => {
    const [page, setPage] = useState(1);
    

    return (
        <div>
            <h1>Agregar Nueva Cancha</h1>
            <RentalForm refreshCourts={() => setPage(1)}  />
            <h1>Lista de Canchas</h1>
            <RentalList page={page} setPage={setPage}/>
        </div>
    );
};

export default Rentals;