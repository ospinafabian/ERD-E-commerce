import mongoose from "mongoose";
import { Shipping } from "../types/shipping.types";


const shippingSchema = new mongoose.Schema <Shipping>({
    courierId: {type: String, required: true},
    shippingDate: {type: String, required: true},
    clientAddress: {type: String, required: true},
    packingSlip:{type: String, required: true},
});

const ShippingSchema = mongoose.model("Shipping", shippingSchema);

export { ShippingSchema };

