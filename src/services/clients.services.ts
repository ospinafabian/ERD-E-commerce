
import { Client } from "../types/Clients.types";
import {readClients,
        readClientsById,
        createClient,
        updateClient,
        deleteClientById
} from '../data/clients.data';

interface ServiceLayerResponse {
    code: number,
    result?: Client | Client[],
    message?: string,
    errorMessage?: unknown,
}

interface ServiceLayerResponse {
    code: number,
    result?: Client | Client[],
    message?: string,
    error?: unknown,
}


const getClients = ():Promise <ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readClients()
            .then((dataLayerResponse: Client[]) => {
                const localClientsDB = dataLayerResponse;
                resolve({code: 200, result: localClientsDB});
            })
            .catch((error) => {
            reject({code:500, message: "error inesperado", errorMessage: error});
        });
    });
};

const getClientsbyId = (id:string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readClientsById(id)
        .then((dataLayerResponse) => {

            if ((dataLayerResponse as Client []).length === 0){
                resolve({code: 404, message: 'Client not found'});
            }else {
                resolve ({code:200, result: dataLayerResponse as Client });
            }
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const postClient = (body: Client): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        createClient(body)
        .then((dataLayerResponse) => {
            resolve({code: 201, message: dataLayerResponse as string });
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const putClient = (id: string, body: Client): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        updateClient(id, body)
        .then((dataLayerResponse) => {
            if (dataLayerResponse === 200){
                resolve ({code: 200, message: 'Client successfully updated' as string})
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

const deleteClient = (id: string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        deleteClientById(id)
        .then ((dataLayerResponse) => {
            if (dataLayerResponse === 200) {
                resolve ({code: 200, message: "Client deleted"});
            }
        })
        .catch ((error) => {
            if (error === 404) {
                reject({code: 404, message: "Client doesn't exist"});
            } else {
                reject ({code: 500, message: "Unexpected error", errorMessage: error});
            }
        });
    });
};


export {
    getClients,
    getClientsbyId,
    postClient,
    putClient,
    deleteClient
};