import { Product } from '../types/products.types';
import {ProductSchema} from '../schemas/products.schema';


const readProducts = (): Promise < Product[] > => {
    return new Promise ( async (resolve,reject) => {
        try {
            const mongoResponse = await ProductSchema.find();
            resolve(mongoResponse);
        } catch (error) {
            reject(error);
        }
    });
};

const readProductsById = (id: string) => {
    return new Promise (async (resolve, reject) => {
        try {
            const mongoResponse = await ProductSchema.findById(id);

            if (mongoResponse === null){
                reject (404);
            }else {
                resolve (mongoResponse);
            }
        } catch (error){
            reject (error);
        }
    });
;}

const createProduct = (body: Product) => {
    return new Promise (async (resolve, reject) => {
        try {
            const product = new ProductSchema(body);
            await product.save();
            resolve ('A new product has been added');
        } catch (error) {
            reject (error);
        }
    });
};

const updateProduct = (sku: string, body: Product) => {
    return new Promise (async (resolve,reject) => {
        try {
            const updateEntity = await ProductSchema.findByIdAndUpdate(sku,body, {new:true});

            if (updateEntity === null){
                reject(404);
            } else{
                resolve (200);
            }
        } catch (error) {
            reject (error);
        }
    });
};

const deleteProductById = (sku: string) =>{
    return new Promise (async (resolve, reject) => {
        try {
            const deleteEnttity = await ProductSchema.findByIdAndRemove(sku);

            if (deleteEnttity === null) {
                reject (404);
            } else {
                resolve (200);
            }
        } catch (error) {
            reject (error);
        }
    });
};

export {
    readProducts,
    readProductsById,
    createProduct,
    updateProduct,
    deleteProductById
};
