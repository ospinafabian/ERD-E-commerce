import express from 'express';

import{
    getPurchaseOrders,
    getPurchaseOrderByPurchaseId,
    postPurchaseOrder,
    putPurchaseOrder,
    deletePurchaseOrder
} from '../services/purchaseOrder.services';

const router = express.Router();

interface CustomErrorFormat {
    code: number,
    message: string,
    errorMessage: unknown
}

router.get('',async (req,res) => {
    try{
        const serviceLayerResponse = await getPurchaseOrders();
        res.status(serviceLayerResponse.code).json({result: serviceLayerResponse.result});
    } catch(error){
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.get('/purchaseId/:purchaseId',async (req,res) => {
    try {
        const purchaseId = req.params.purchaseId;
        const serviceLayerResponse = await getPurchaseOrderByPurchaseId(purchaseId);

        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.post('/newPurchaseOrder', async (req,res) => {
    try {
        const body = req.body;
        const serviceLayerResponse = await postPurchaseOrder(body);

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
        const serviceLayerResponse = await putPurchaseOrder(id,body);

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
        const serviceLayerResponse = await deletePurchaseOrder(id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log (customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
})

export default router;