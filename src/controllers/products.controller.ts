import express from 'express';

import{
    getProducts,
    getProductsbyId,
    postProduct,
    putProduct,
    deleteProduct
} from '../services/products.services';

const router = express.Router();

interface CustomErrorFormat {
    code: number,
    message: string,
    errorMessage: unknown
}

router.get('',async (req,res) => {
    try{
        const serviceLayerResponse = await getProducts();
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
        const serviceLayerResponse = await getProductsbyId(id);

        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.post('/newProduct', async (req,res) => {
    try {
        const body = req.body;
        const serviceLayerResponse = await postProduct(body);

        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.put('/sku/:sku', async function (req,res) {
    try {
        const sku = req.params.sku;
        const body = req.body;
        const serviceLayerResponse = await putProduct(sku, body);

        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log (customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.delete('/sku/:sku', async function (req,res) {
    try {
        const sku = req.params.sku;
        const serviceLayerResponse = await deleteProduct(sku);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log (customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
})

export default router;