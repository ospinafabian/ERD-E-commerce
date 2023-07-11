import mongoose from "mongoose";
import { purchaseOrder } from "../types/purchaseOrder.types";


const purchaseOrderSchema = new mongoose.Schema <purchaseOrder>({
    purchaseId: {type: String, required: true},
    status: {type: String, required: true},
    quantity: {type: String, required: true},
    price:{type: String, required: true},
    discount:{type: String, required: false}
});

const PurchaseOrderSchema = mongoose.model("Purchase Orders", purchaseOrderSchema);

export { PurchaseOrderSchema };

