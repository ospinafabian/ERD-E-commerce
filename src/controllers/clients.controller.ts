import express from 'express';

import{
    getClients,
    getClientsbyId,
    postClient,
    putClient,
    deleteClient
} from '../services/clients.services';

const router = express.Router();

interface CustomErrorFormat {
    code: number,
    message: string,
    errorMessage: unknown
}

router.get('',async (req,res) => {
    try{
        const serviceLayerResponse = await getClients();
        res.status(serviceLayerResponse.code).json({result: serviceLayerResponse.result});
    } catch(error){
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.get('/id/:id',async (req,res) => {
    try {
        const id = req.params.id;
        const serviceLayerResponse = await getClientsbyId(id);

        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.post('/newReview', async (req,res) => {
    try {
        const body = req.body;
        const serviceLayerResponse = await postClient(body);

        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.put('/id/:id', async function (req,res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const serviceLayerResponse = await putClient(id,body);

        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log (customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.delete('/id/:id', async function (req,res) {
    try {
        const id = req.params.id;
        const serviceLayerResponse = await deleteClient(id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log (customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
})

export default router;