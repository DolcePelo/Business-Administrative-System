import mongoose, { mongo } from "mongoose";
import paginate from "mongoose-paginate-v2";

const rentalCollection = "rental";

const RentalSchema = new mongoose.Schema({
    courtType: {
        type: String,
        required: true
    },
    courtNumber: {
        type: Number,
        required: true
    },
    priceRanges: [
        {
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            },
            prices: {
                price60: { type: Number },
                price90: { type: Number },
                price120: { type: Number },
            }
        }
    ]
});

RentalSchema.plugin(paginate);

const rentalModel = mongoose.model(rentalCollection, RentalSchema);

export default rentalModel;