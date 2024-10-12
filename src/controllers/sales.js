import salesService from "../dao/dbManager/sales.js";
import productService from "../dao/dbManager/products.js";
import rentalService from "../dao/dbManager/rental.js";
import logger from "../config/logger.js";

const sales = new salesService();
const products = new productService();
const rentals = new rentalService();

const getSales = async (req, res) => {
    const result = await sales.getSales();
    res.json(result);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const result = await sales.getSaleById(id);

    if (!result) {
        res.status(404).json({ message: "Sale not found" });
    }

    res.json(result)
};

const createSale = async (req, res) => {
    try {
        const response = await sales.createSale(req.body);

        if (!response || !response._id) {
            logger.error("Error al intentar crear el carrito.");
            return res.status(500).json({ status: "error", error: "Internal error" });
        }

        res.json({
            status: "ok",
            message: "Sale created successfully",
            data: response
        })
    } catch (error) {
        console.error("Error creating sale", error);
        res.status(500).json({ status: "error", error: "Internal error" });
    }
}

const addProductToSale = async (req, res) => {
    const { sid, pid } = req.params;

    try {
        const isSalesValid = await sales.getSaleById(sid);
        const isProductValid = await products.getProductById(pid);

        if (!isSalesValid || !isProductValid) {
            const validationError = "Venta o Producto no encontrado";
            logger.error(validationError);
            return res.status(400).json({
                status: 'error',
                message: validationError,
            });
        }

        const newProduct = {
            product: pid,
            quantity: 1,
        };

        const updateSale = await sales.addProductToSale(sid, newProduct);

        return res.json({
            status: 'ok',
            message: 'Product added/updated in sale',
            sale: updateSale,
        });
    } catch (error) {
        logger.error("Error adding product to sale", error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal server error',
        });
    }
}

const deleteProductFromSale = async (req, res) => {
    const { sid, pid } = req.params;
    try {
        const isSalesValid = await sales.getSaleById(sid);
        const isProductValid = await products.getProductById(pid);

        if (!isSalesValid || !isProductValid) {
            const validationError = "Venta o Producto no encontrado";
            logger.error(validationError);
            return res.status(400).json({
                status: 'error',
                message: validationError,
            });
        }

        const productToDelete = {
            product: pid,
            quantity: 1,
        }

        const updateSale = await sales.deleteProductFromSale(sid, productToDelete);

        return res.json({
            status: 'ok',
            message: 'Product deleted from sale',
            sale: updateSale,
        });
    } catch (error) {
        logger.error("Error deleting product from sale", error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal server error',
        })
    }
}

const addRentalToSale = async (req, res) => {
    const { sid, rid } = req.params;
    const { startTime, minutes } = req.body; // Recibes la hora de inicio y los minutos desde el body

    try {
        const sale = await sales.getSaleById(sid);
        const rental = await rentals.getRentalById(rid);

        if (!sale || !rental) {
            const validationError = "Venta o Renta no encontrada";
            logger.error(validationError);
            return res.status(400).json({
                status: 'error',
                message: validationError,
            });
        }

        // Convertir startTime en objeto de fecha para comparaciones
        const startDate = new Date(`1970-01-01T${startTime}:00`);
        
        // Buscar el rango de precios según el horario de inicio
        const priceRange = rental.priceRanges.find(range => {
            const rangeStart = new Date(`1970-01-01T${range.startTime}:00`);
            const rangeEnd = new Date(`1970-01-01T${range.endTime}:00`);

            if (range.endTime === "00:00") {
                rangeEnd.setDate(rangeEnd.getDate() + 1); // Hacer que 00:00 sea el fin del día
            }
            
            return startDate >= rangeStart && startDate < rangeEnd;
        });

        if (!priceRange) {
            const validationError = "No se encontró un rango de precios para la fecha de inicio";
            logger.error(validationError);
            return res.status(400).json({
                status: 'error',
                message: validationError,
            });
        }

        // Asignar el precio correcto según los minutos de alquiler
        let price;
        switch (minutes) {
            case 60:
                price = priceRange.prices.price60;
                break;
            case 90:
                price = priceRange.prices.price90;
                break;
            case 120:
                price = priceRange.prices.price120;
                break;
            default:
                return res.status(400).json({
                    status: 'error',
                    error: 'Invalid rental duration',
                });
        }

        // Actualizar la venta con el nuevo alquiler
        const newRental = {
            rental: rid,
            quantity: 1,
            minutes,
            amount: price
        };

        const updatedSale = await sales.addRentalToSale(sid, newRental);

        return res.json({
            status: 'ok',
            message: 'Rental added to sale',
            sale: updatedSale,
        });
    } catch (error) {
        console.error("Error adding rental to sale", error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal server error',
        });
    }
};


const deleteRentalFromSale = async (req, res) => {
    const { sid, rid } = req.params;

    try {
        const sale = await sales.getSaleById(sid);
        const rental = await rentals.getRentalById(rid);

        if (!sale || !rental) {
            const validationError = "Venta o Renta no encontrada";
            logger.error(validationError);
            return res.status(400).json({
                status: 'error',
                message: validationError,
            });
        }

        // Lógica para eliminar el alquiler de la venta
        const updatedSale = await sales.deleteRentalFromSale(sid, rid);

        return res.json({
            status: 'ok',
            message: 'Rental deleted from sale',
            sale: updatedSale,
        });
    } catch (error) {
        console.error("Error deleting rental from sale", error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal server error',
        });
    }
};


const deleteSale = async (req, res) => {
    const { id } = req.params;
    try {
        const isSaleValid = await sales.getSaleById(id);
        if (!isSaleValid) {
            return res.status(400).json({
                status: 'error',
                error: 'Sale not found',
            })
        } else {
            const deleteSale = await sales.deleteSale(id);
            return res.json({
                status: 'ok',
                message: 'Sale deleted',
                sale: deleteSale
            })
        }
    } catch (error) {
        console.error("Error deleting sale", error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal server error',
        })
    }
};

const resolveSale = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const sale = await sales.getSaleById(id);

        if (!sale) {
            return res.status(400).json({
                message: 'Sale not found',
            });
        }

        if (status === "confirmed") {
            for (const saleProduct of sale.products) {
                const product = await products.getProductById(saleProduct.product);

                if (product.stock < saleProduct.quantity) {
                    return res.status(400).json({
                        message: 'Not enough stock',
                    });
                }

                product.stock -= saleProduct.quantity;
                await products.updateProduct(product._id, product);
            }
        }
        
        const updatedSale = await sales.resolveSale(id, { status });

        return res.json({
            status: 'ok',
            message: `Sale ${status}`,
            data: updatedSale
        });
    } catch (error) {
        console.error("Error resolving sale", error);
        return res.status(500).json({
            status: 'error',
            error: 'Internal server error',
        })
    }
}

export { getSales, getSaleById, createSale, addProductToSale, deleteProductFromSale, addRentalToSale, deleteRentalFromSale, deleteSale, resolveSale }