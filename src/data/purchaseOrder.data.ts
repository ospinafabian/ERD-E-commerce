import { purchaseOrder } from '../types/purchaseOrder.types';
import {PurchaseOrderSchema} from '../schemas/purchaseOrder.schema';


const readPurchaseOrders = (): Promise < purchaseOrder[] > => {
    return new Promise ( async (resolve,reject) => {
        try {
            const mongoResponse = await PurchaseOrderSchema.find();
            resolve(mongoResponse);
        } catch (error) {
            reject(error);
        }
    });
};

const readPurchaseOrderByPurchaseId = (purchaseId: string) => {
    return new Promise (async (resolve, reject) => {
        try {
            const mongoResponse = await PurchaseOrderSchema.findOne({purchaseId: purchaseId});

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

const createPurchaseOrder = (body: purchaseOrder) => {
    return new Promise (async (resolve, reject) => {
        try {
            const purchaseOrder = new PurchaseOrderSchema(body);
            await purchaseOrder.save();
            resolve ('A new review has been added');
        } catch (error) {
            reject (error);
        }
    });
};

const updatePurchaseOrder = (id: string, body: purchaseOrder) => {
    return new Promise (async (resolve,reject) => {
        try {
            const updateEntity = await PurchaseOrderSchema.findByIdAndUpdate(id,body, {new:true});

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

const deletePurchaseOrderById = (id: string) =>{
    return new Promise (async (resolve, reject) => {
        try {
            const deletedEntity = await PurchaseOrderSchema.findByIdAndRemove(id);

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
    readPurchaseOrders,
    readPurchaseOrderByPurchaseId,
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrderById
};
