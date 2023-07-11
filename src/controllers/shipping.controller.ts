import express from 'express';

import{
    getShippings,
    getShippingByPackingSlip,
    postShipping,
    putShipping,
    deleteShipping
} from '../services/shipping.services';

const router = express.Router();

interface CustomErrorFormat {
    code: number,
    message: string,
    errorMessage: unknown
}

router.get('',async (req,res) => {
    try{
        const serviceLayerResponse = await getShippings();
        res.status(serviceLayerResponse.code).json({result: serviceLayerResponse.result});
    } catch(error){
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.get('/packingSlip/:packingSlip',async (req,res) => {
    try {
        const packingSlip = req.params.packingSlip;
        const serviceLayerResponse = await getShippingByPackingSlip(packingSlip);

        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.post('/newShipping', async (req,res) => {
    try {
        const body = req.body;
        const serviceLayerResponse = await postShipping(body);

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
        const serviceLayerResponse = await putShipping(id,body);

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
        const serviceLayerResponse = await deleteShipping(id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log (customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
})

export default router;