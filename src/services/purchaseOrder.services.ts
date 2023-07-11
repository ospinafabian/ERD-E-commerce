
import { purchaseOrder } from "../types/purchaseOrder.types";
import {readPurchaseOrders,
    readPurchaseOrderByPurchaseId,
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrderById
} from '../data/purchaseOrder.data';

interface ServiceLayerResponse {
    code: number,
    result?: purchaseOrder | purchaseOrder[],
    message?: string,
    errorMessage?: unknown,
}


const getPurchaseOrders = ():Promise <ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readPurchaseOrders()
            .then((dataLayerResponse: purchaseOrder[]) => {
                const localPurchaseOrdersDB = dataLayerResponse;
                resolve({code: 200, result: localPurchaseOrdersDB});
            })
            .catch((error) => {
            reject({code:500, message: "error inesperado", errorMessage: error});
        });
    });
};

const getPurchaseOrderByPurchaseId = (purchaseId:string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readPurchaseOrderByPurchaseId(purchaseId)
        .then((dataLayerResponse) => {

            if ((dataLayerResponse as purchaseOrder []).length === 0){
                resolve({code: 404, message: 'Review not found'});
            }else {
                resolve ({code:200, result: dataLayerResponse as purchaseOrder });
            }
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const postPurchaseOrder = (body: purchaseOrder): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        createPurchaseOrder(body)
        .then((dataLayerResponse) => {
            resolve({code: 201, message: dataLayerResponse as string });
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const putPurchaseOrder = (id: string, body: purchaseOrder): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        updatePurchaseOrder(id, body)
        .then((dataLayerResponse) => {
            if (dataLayerResponse === 200){
                resolve ({code: 200, message: 'Review successfully updated' as string})
            }
        })
        .catch ( error => {
            if (error === 404){
                reject ({ code: 404, message: 'Review not found'});
            } else {
                reject ({code: 500, message: 'Unexpected error', errorMessage: error});
            }
        });
    });
};

const deletePurchaseOrder = (id: string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        deletePurchaseOrderById(id)
        .then ((dataLayerResponse) => {
            if (dataLayerResponse === 200) {
                resolve ({code: 200, message: "Review deleted"});
            }
        })
        .catch ((error) => {
            if (error === 404) {
                reject({code: 404, message: "Review doesn't exist"});
            } else {
                reject ({code: 500, message: "Unexpected error", errorMessage: error});
            }
        });
    });
};


export {
    getPurchaseOrders,
    getPurchaseOrderByPurchaseId,
    postPurchaseOrder,
    putPurchaseOrder,
    deletePurchaseOrder
};