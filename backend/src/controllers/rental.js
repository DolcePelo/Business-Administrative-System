import rentalService from "../dao/dbManager/rental.js";
import logger from "../config/logger.js";

const rentals = new rentalService();

// Obtener todos los alquileres (con paginación)
const getRentals = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    try {
        const rentalsList = await rentals.getRentals(page, limit);
        res.json({
            status: 200,
            message: "Rentals retrieved successfully",
            data: rentalsList
        });
    } catch (error) {
        console.log("Error retrieving rentals: ", error);
        res.status(500).json({
            status: 500,
            message: "Error retrieving rentals"
        });
    }
};

// Obtener un alquiler por ID
const getRentalById = async (req, res) => {
    const { id } = req.params;
    try {
        const rental = await rentals.getRentalById(id);
        if (!rental) {
            return res.status(404).json({
                status: 404,
                message: "Rental not found"
            });
        }
        res.json({
            status: 200,
            message: "Rental retrieved successfully",
            data: rental
        });
    } catch (error) {
        console.log("Error retrieving rental: ", error);
        res.status(500).json({
            status: 500,
            message: "Error retrieving rental"
        });
    }
};

// Crear un nuevo alquiler
const saveRental = async (req, res) => {
    const { courtType, courtNumber, priceRanges } = req.body;
    try {
        if (!courtType || !courtNumber || !priceRanges) {
            const validationError = "Faltan campos requeridos para crear el alquiler";
            logger.error(validationError)
            return res.status(400).json({
                status: 400,
                message: validationError
            })
        }

        const newRental = {
            courtType,
            courtNumber,
            priceRanges
        };

        const response = await rentals.saveRental(newRental);
        res.status(201).json({
            status: 201,
            message: "Rental created successfully",
            data: response
        });
    } catch (error) {
        logger.error("Error al crear el alquiler: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear el alquiler"
        });
    }
};

// Actualizar un alquiler por ID
const updateRental = async (req, res) => {
    const { id } = req.params;
    const { courtType, courtNumber, amount, hours, customerName, rentalStatus } = req.body;

    try {
        const updatedRental = { courtType, courtNumber, amount, hours, customerName, rentalStatus };
        const response = await rentals.updateRental(id, updatedRental);

        if (response.nModified === 0) {
            return res.status(404).json({
                status: 404,
                message: "Rental not found or no changes made"
            });
        }
        res.json({
            status: 200,
            message: "Rental updated successfully",
            data: response
        });
    } catch (error) {
        console.log("Error updating rental: ", error);
        res.status(500).json({
            status: 500,
            message: "Error updating rental"
        });
    }
};

// Eliminar un alquiler por ID
const deleteRental = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await rentals.deleteRental(id);
        if (response.deletedCount === 0) {
            return res.status(404).json({
                status: 404,
                message: "Rental not found"
            });
        }
        res.json({
            status: 200,
            message: "Rental deleted successfully",
            data: response
        });
    } catch (error) {
        console.log("Error deleting rental: ", error);
        res.status(500).json({
            status: 500,
            message: "Error deleting rental"
        });
    }
};

export { getRentals, getRentalById, saveRental, updateRental, deleteRental };
