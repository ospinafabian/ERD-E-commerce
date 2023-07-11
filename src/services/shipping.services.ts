
import { Shipping } from "../types/shipping.types";
import {readShipping,
    readShippingByPackingSlip,
    createShipping,
    updateShipping,
    deleteShippingById
} from '../data/shipping.data';

interface ServiceLayerResponse {
    code: number,
    result?: Shipping | Shipping[],
    message?: string,
    errorMessage?: unknown,
}


const getShippings = ():Promise <ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readShipping()
            .then((dataLayerResponse: Shipping[]) => {
                const localShippingsDB = dataLayerResponse;
                resolve({code: 200, result: localShippingsDB});
            })
            .catch((error) => {
            reject({code:500, message: "error inesperado", errorMessage: error});
        });
    });
};

const getShippingByPackingSlip = (packingSlip:string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readShippingByPackingSlip(packingSlip)
        .then((dataLayerResponse) => {

            if ((dataLayerResponse as Shipping []).length === 0){
                resolve({code: 404, message: 'Ship not found'});
            }else {
                resolve ({code:200, result: dataLayerResponse as Shipping });
            }
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const postShipping = (body: Shipping): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        createShipping(body)
        .then((dataLayerResponse) => {
            resolve({code: 201, message: dataLayerResponse as string });
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const putShipping = (id: string, body: Shipping): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        updateShipping(id, body)
        .then((dataLayerResponse) => {
            if (dataLayerResponse === 200){
                resolve ({code: 200, message: 'Ship successfully updated' as string})
            }
        })
        .catch ( error => {
            if (error === 404){
                reject ({ code: 404, message: 'Ship not found'});
            } else {
                reject ({code: 500, message: 'Unexpected error', errorMessage: error});
            }
        });
    });
};

const deleteShipping = (id: string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        deleteShippingById(id)
        .then ((dataLayerResponse) => {
            if (dataLayerResponse === 200) {
                resolve ({code: 200, message: "Ship deleted"});
            }
        })
        .catch ((error) => {
            if (error === 404) {
                reject({code: 404, message: "Ship doesn't exist"});
            } else {
                reject ({code: 500, message: "Unexpected error", errorMessage: error});
            }
        });
    });
};


export {
    getShippings,
    getShippingByPackingSlip,
    postShipping,
    putShipping,
    deleteShipping
};