import salesModel from "../models/sales.js";
import productModel from "../models/products.js";
import rentalModel from "../models/rental.js";

export default class Sales {
    constructor() {
        console.log("Working sales with database in mongoDB")
    }

    getSales = async () => {
        try {
            return await salesModel.find()
        } catch (error) {
            console.log("Error al obtener las ventas", error);
        }
    };

    getSaleById = async (id) => {
        try {
            return await salesModel.findById(id)
        } catch (error) {
            console.log("Error al obtener la venta por id", error);
        }
    };

    createSale = async (sale) => {
        try {
            const newSale = await new salesModel(sale);
            await newSale.save();
            return newSale;
        } catch (error) {
            console.log("Error al crear la venta", error);
            throw error;
        }
    };

    resolveSale = async (id, order) => {
        try {
            return await salesModel.findByIdAndUpdate(id, order, { new: true });
        } catch (error) {
            console.log("Error al resolver la venta", error);
            throw error;
        }
    };

    addProductToSale = async (sid, productData) => {
        try {
            const sale = await salesModel.findById(sid);
            if (!sale) {
                throw new Error("Sale not found");
            }

            const product = await productModel.findById(productData.product);
            if (!product) {
                throw new Error("Product not found");
            }

            const productIndex = sale.products.findIndex((product) => product.product.equals(productData.product)
            );

            if (productIndex === -1) {
                productData.amount = product.price * productData.quantity;
                sale.products.push(productData);
            } else {
                sale.products[productIndex].quantity += productData.quantity;
                sale.products[productIndex].amount = sale.products[productIndex].quantity * product.price;
            }

            const productTotal = sale.products.reduce((acc, prod) => acc + prod.amount, 0);
            const rentalTotal = sale.rentals.reduce((acc, rental) => acc + rental.amount, 0);
            sale.total = productTotal + rentalTotal;

            return await salesModel.findByIdAndUpdate(sid, { products: sale.products, total: sale.total }, { new: true });
        } catch (error) {
            console.log("Error adding product to sale", error);
            throw error;
        }
    };

    deleteProductFromSale = async (sid, productData) => {
        try {
            const sale = await salesModel.findById(sid);
            if (!sale) {
                throw new Error("Sale not found");
            }

            const productIndex = sale.products.findIndex((product) => product.product.equals(productData.product)
            );

            if (productIndex === -1) {
                throw new Error("Product not found in sale");
            } else {
                sale.products[productIndex].quantity -= productData.quantity;

                const product = await productModel.findById(productData.product);
                sale.products[productIndex].amount = sale.products[productIndex].quantity * product.price;

                if (sale.products[productIndex].quantity <= 0) {
                    sale.products.splice(productIndex, 1); //si cantidad es cero remueve el producto
                }
            }
            const productTotal = sale.products.reduce((acc, prod) => acc + prod.amount, 0);
            const rentalTotal = sale.rentals.reduce((acc, rental) => acc + rental.amount, 0);
            sale.total = productTotal + rentalTotal;

            return await salesModel.findByIdAndUpdate(sid, { products: sale.products, total: sale.total }, { new: true });
        } catch (error) {
            console.log("Error deleting product from sale", error);
            throw error;
        }
    }

    addRentalToSale = async (saleId, rental) => {
        const sale = await salesModel.findById(saleId);
        sale.rentals.push(rental);
        sale.total += rental.amount; // Actualizar el total con el monto del alquiler
        await sale.save();
        return sale;
    };
    
    deleteRentalFromSale = async (saleId, rentalId) => {
        const sale = await salesModel.findById(saleId);
        const rentalIndex = sale.rentals.findIndex(r => r.rental.toString() === rentalId);
        
        if (rentalIndex !== -1) {
            const rental = sale.rentals[rentalIndex];
            sale.total -= rental.amount; // Restar el monto del alquiler
            sale.rentals.splice(rentalIndex, 1); // Eliminar el alquiler
            await sale.save();
        }
    
        return sale;
    };
    

    deleteSale = async (sid) => {
        try {
            const sale = await salesModel.findById(sid);
            if (!sale) {
                throw new Error("Sale not found");
            }
            return await sale.deleteOne({ _id: sid })
        } catch (error) {
            console.log("Error deleting sale", error);
            throw error;
        }
    }
}

