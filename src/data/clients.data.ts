import { Client } from '../types/Clients.types';
import {ClientSchema} from '../schemas/clients.schema';


const readClients = (): Promise < Client[] > => {
    return new Promise ( async (resolve,reject) => {
        try {
            const mongoResponse = await ClientSchema.find();
            resolve(mongoResponse);
        } catch (error) {
            reject(error);
        }
    });
};

const readClientsById = (id: string) => {
    return new Promise (async (resolve, reject) => {
        try {
            const mongoResponse = await ClientSchema.findById(id);

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

const createClient = (body: Client) => {
    return new Promise (async (resolve, reject) => {
        try {
            const client = new ClientSchema(body);
            await client.save();
            resolve ('A new client has been added');
        } catch (error) {
            reject (error);
        }
    });
};

const updateClient = (id: string, body: Client) => {
    return new Promise (async (resolve,reject) => {
        try {
            const updateEntity = await ClientSchema.findByIdAndUpdate(id,body, {new:true});

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

const deleteClientById = (id: string) =>{
    return new Promise (async (resolve, reject) => {
        try {
            const deleteEnttity = await ClientSchema.findByIdAndRemove(id);

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
    readClients,
    readClientsById,
    createClient,
    updateClient,
    deleteClientById
};
