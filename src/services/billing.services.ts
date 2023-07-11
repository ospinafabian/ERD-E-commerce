
import { Billing } from "../types/billing.types";
import {readBillings,
        readBillingsByInvoiceNumber,
        createBilling,
        updateBilling,
        deleteBillingById
} from '../data/billing.data';

interface ServiceLayerResponse {
    code: number,
    result?: Billing | Billing[],
    message?: string,
    errorMessage?: unknown,
}


const getBillings = ():Promise <ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readBillings()
            .then((dataLayerResponse: Billing[]) => {
                const localBillsDB = dataLayerResponse;
                resolve({code: 200, result: localBillsDB});
            })
            .catch((error) => {
            reject({code:500, message: "error inesperado", errorMessage: error});
        });
    });
};

const getBillingByInvoiceNumber = (invoiceNumber:string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readBillingsByInvoiceNumber(invoiceNumber)
        .then((dataLayerResponse) => {

            if ((dataLayerResponse as Billing []).length === 0){
                resolve({code: 404, message: 'Bill not found'});
            }else {
                resolve ({code:200, result: dataLayerResponse as Billing });
            }
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const postBilling = (body: Billing): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        createBilling(body)
        .then((dataLayerResponse) => {
            resolve({code: 201, message: dataLayerResponse as string });
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const putBilling = (id: string, body: Billing): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        updateBilling(id, body)
        .then((dataLayerResponse) => {
            if (dataLayerResponse === 200){
                resolve ({code: 200, message: 'Billing successfully updated' as string})
            }
        })
        .catch ( error => {
            if (error === 404){
                reject ({ code: 404, message: 'Billing not found'});
            } else {
                reject ({code: 500, message: 'Unexpected error', errorMessage: error});
            }
        });
    });
};

const deleteBilling = (id: string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        deleteBillingById(id)
        .then ((dataLayerResponse) => {
            if (dataLayerResponse === 200) {
                resolve ({code: 200, message: "Bill deleted"});
            }
        })
        .catch ((error) => {
            if (error === 404) {
                reject({code: 404, message: "Bill doesn't exist"});
            } else {
                reject ({code: 500, message: "Unexpected error", errorMessage: error});
            }
        });
    });
};


export {
    getBillings,
    getBillingByInvoiceNumber,
    postBilling,
    putBilling,
    deleteBilling
};