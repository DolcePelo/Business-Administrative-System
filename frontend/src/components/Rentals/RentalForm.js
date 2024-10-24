import { useState } from "react";
import axios from "../../config/axiosConfig.js";


const RentalForm = ({ refreshCourts }) => {
    const [formData, setFormData] = useState({
        courtType: "",
        courtNumber: "",
        priceRanges: [
            {
                startTime: "",
                endTime: "",
                prices: {
                    price60: "",
                    price90: "",
                    price120: ""
                }
            }
        ]
    });

    const handleChange = (e, index, field, priceField) => {
        const { name, value } = e.target;

        // Manejar el cambio en los valores de los campos de rango de precios
        if (field === 'priceRanges') {
            setFormData(prev => {
                const updatedRanges = [...prev.priceRanges];
                if (priceField) {
                    updatedRanges[index].prices[priceField] = value;
                } else {
                    updatedRanges[index][name] = value;
                }
                return { ...prev, priceRanges: updatedRanges };
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }

    const addPriceRange = () => {
        setFormData(prev => ({
            ...prev,
            priceRanges: [...prev.priceRanges, {
                startTime: "",
                endTime: "",
                prices: {
                    price60: "",
                    price90: "",
                    price120: ""
                }
            }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/rental", formData);
            alert("Cancha creada con éxito");
            //limpiar los campos
            setFormData({
                courtType: "",
                courtNumber: "",
                priceRanges: [
                    {
                        startTime: "",
                        endTime: "",
                        prices: {
                            price60: "",
                            price90: "",
                            price120: ""
                        }
                    }
                ]
            });
            
            refreshCourts();
        } catch (error) {
            console.error("Error al crear cancha", error);
        }
    };

    return (<form onSubmit={handleSubmit}>
        <label>Tipo de Cancha</label>
        <input name="courtType" value={formData.courtType} onChange={handleChange} required />

        <label>Número de Cancha</label>
        <input type="number" name="courtNumber" value={formData.courtNumber} onChange={handleChange} required />

        {formData.priceRanges.map((range, index) => (
            <div key={index}>
                <label>Hora de Inicio</label>
                <input type="time" name="startTime" value={range.startTime} onChange={(e) => handleChange(e, index, 'priceRanges')} required />

                <label>Hora de Fin</label>
                <input type="time" name="endTime" value={range.endTime} onChange={(e) => handleChange(e, index, 'priceRanges')} required />

                <label>Precio 60 Min</label>
                <input type="number" name="price60" value={range.prices.price60} onChange={(e) => handleChange(e, index, 'priceRanges', 'price60')} />

                <label>Precio 90 Min</label>
                <input type="number" name="price90" value={range.prices.price90} onChange={(e) => handleChange(e, index, 'priceRanges', 'price90')} />

                <label>Precio 120 Min</label>
                <input type="number" name="price120" value={range.prices.price120} onChange={(e) => handleChange(e, index, 'priceRanges', 'price120')} />
            </div>
        ))}

        <button type="button" onClick={addPriceRange}>Agregar Rango de Precios</button>
        <button type="submit">Crear Cancha</button>
    </form>)
}

export default RentalForm;