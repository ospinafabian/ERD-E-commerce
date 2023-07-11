import { Billing } from '../types/billing.types';
import {BillingSchema} from '../schemas/billing.schema';


const readBillings = (): Promise < Billing[] > => {
    return new Promise ( async (resolve,reject) => {
        try {
            const mongoResponse = await BillingSchema.find();
            resolve(mongoResponse);
        } catch (error) {
            reject(error);
        }
    });
};

const readBillingsByInvoiceNumber = (invoiceNumber: string) => {
    return new Promise (async (resolve, reject) => {
        try {
            const mongoResponse = await BillingSchema.findOne({invoiceNumber: invoiceNumber});

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

const createBilling = (body: Billing) => {
    return new Promise (async (resolve, reject) => {
        try {
            const billing = new BillingSchema(body);
            await billing.save();
            resolve ('A new bill has been added');
        } catch (error) {
            reject (error);
        }
    });
};

const updateBilling = (id: string, body: Billing) => {
    return new Promise (async (resolve,reject) => {
        try {
            const updateEntity = await BillingSchema.findByIdAndUpdate(id,body, {new:true});

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

const deleteBillingById = (id: string) =>{
    return new Promise (async (resolve, reject) => {
        try {
            const deletedEntity = await BillingSchema.findByIdAndRemove(id);

            if (deletedEntity === null) {
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
    readBillings,
    readBillingsByInvoiceNumber,
    createBilling,
    updateBilling,
    deleteBillingById
};
