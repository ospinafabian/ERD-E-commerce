import mongoose from "mongoose";
import { Billing } from "../types/billing.types";


const billingSchema = new mongoose.Schema <Billing>({
    invoiceDate: {type: String, required: true},
    invoiceNumber: {type: String, required: true},
    cardType: {type: String, required: true},
    cardNumber:{type: String, required: true},
});

const BillingSchema = mongoose.model("Billing", billingSchema);

export { BillingSchema };

