import { Shipping } from '../types/shipping.types';
import {ShippingSchema} from '../schemas/shipping.schema';


const readShipping = (): Promise < Shipping[] > => {
    return new Promise ( async (resolve,reject) => {
        try {
            const mongoResponse = await ShippingSchema.find();
            resolve(mongoResponse);
        } catch (error) {
            reject(error);
        }
    });
};

const readShippingByPackingSlip = (packingSlip: string) => {
    return new Promise (async (resolve, reject) => {
        try {
            const mongoResponse = await ShippingSchema.findOne({packingSlip: packingSlip});

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

const createShipping = (body: Shipping) => {
    return new Promise (async (resolve, reject) => {
        try {
            const shipping = new ShippingSchema(body);
            await shipping.save();
            resolve ('A new ship has been added');
        } catch (error) {
            reject (error);
        }
    });
};

const updateShipping = (id: string, body: Shipping) => {
    return new Promise (async (resolve,reject) => {
        try {
            const updateEntity = await ShippingSchema.findByIdAndUpdate(id,body, {new:true});

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

const deleteShippingById = (id: string) =>{
    return new Promise (async (resolve, reject) => {
        try {
            const deletedEntity = await ShippingSchema.findByIdAndRemove(id);

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
    readShipping,
    readShippingByPackingSlip,
    createShipping,
    updateShipping,
    deleteShippingById
};
