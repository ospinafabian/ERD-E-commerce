import mongoose from "mongoose";
import { Client } from "../types/Clients.types";


const clientSchema = new mongoose.Schema <Client>({
    name: {type: String, required: true},
    cc: {type: String, required: true},
    email: {type: String, required: true},
    phone:{type: String, required: true},
    birthDate:{type: String, required: true},
    address: {type: String, required: true}
});

const ClientSchema = mongoose.model("Clients", clientSchema);

export { ClientSchema };

