import mongoose from "mongoose";
import { Product } from "../types/products.types";


const productSchema = new mongoose.Schema <Product>({
    name: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    warranty:{type: String, required: true},
    stock:{type: Number, required: true},
    sku: {type: String, required: true}
});

const ProductSchema = mongoose.model("Products", productSchema);

export { ProductSchema };

