import rentalModel from '../models/rental.js';

export default class Rentals {
    constructor() {
        console.log("Working rentals with database in MongoDB");
    }

    // Obtener todos los alquileres
    getRentals = async (page = 1, limit = 10) => {
        const options = {
            page: page,
            limit: limit,
            lean: true,
        };
        const rentals = await rentalModel.paginate({}, options);
        return rentals;
    };

    // Obtener un alquiler por ID
    getRentalById = async (id) => {
        const rental = await rentalModel.findById(id).lean();
        return rental;
    };

    // Crear un nuevo alquiler de cancha
    saveRental = async (rentalData) => {
        try {
            const newRental = new rentalModel(rentalData);
            const result = await newRental.save();
            return result;
        } catch (error) {
            console.error("Error creating rental:", error);
            throw error;
        }
    };

    // Actualizar un alquiler
    updateRental = async (id, rentalData) => {
        const result = await rentalModel.updateOne({ _id: id }, rentalData);
        return result;
    };

    // Eliminar un alquiler por ID
    deleteRental = async (id) => {
        const result = await rentalModel.deleteOne({ _id: id });
        return result;
    };
}
