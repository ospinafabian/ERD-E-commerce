
import { Product } from "../types/products.types";
import {readProducts,
        readProductsByName,
        createProduct,
        updateProduct,
        deleteProductById
} from '../data/products.data';

interface ServiceLayerResponse {
    code: number,
    result?: Product | Product[],
    message?: string,
    errorMessage?: unknown,
}


const getProducts = ():Promise <ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readProducts()
            .then((dataLayerResponse: Product[]) => {
                const localProductsDB = dataLayerResponse;
                resolve({code: 200, result: localProductsDB});
            })
            .catch((error) => {
            reject({code:500, message: "error inesperado", errorMessage: error});
        });
    });
};

const getProductsbyName = (name:string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readProductsByName(name)
        .then((dataLayerResponse) => {

            if ((dataLayerResponse as Product []).length === 0){
                resolve({code: 404, message: 'Product not found'});
            }else {
                resolve ({code:200, result: dataLayerResponse as Product });
            }
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const postProduct = (body: Product): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        createProduct(body)
        .then((dataLayerResponse) => {
            resolve({code: 201, message: dataLayerResponse as string });
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const putProduct = (id: string, body: Product): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        updateProduct(id, body)
        .then((dataLayerResponse) => {
            if (dataLayerResponse === 200){
                resolve ({code: 200, message: 'Product successfully updated' as string})
            }
        })
        .catch ( error => {
            if (error === 404){
                reject ({ code: 404, message: 'product not found'});
            } else {
                reject ({code: 500, message: 'Unexpected error', errorMessage: error});
            }
        });
    });
};

const deleteProduct = (id: string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        deleteProductById(id)
        .then ((dataLayerResponse) => {
            if (dataLayerResponse === 200) {
                resolve ({code: 200, message: "Product deleted"});
            }
        })
        .catch ((error) => {
            if (error === 404) {
                reject({code: 404, message: "product doesn't exist"});
            } else {
                reject ({code: 500, message: "Unexpected error", errorMessage: error});
            }
        });
    });
};


export {
    getProducts,
    getProductsbyName,
    postProduct,
    putProduct,
    deleteProduct
};