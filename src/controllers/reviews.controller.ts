import express from 'express';

import{
    getReviews,
    getReviewsbyId,
    postReview,
    putReview,
    deleteReview
} from '../services/reviews.services';

const router = express.Router();

interface CustomErrorFormat {
    code: number,
    message: string,
    errorMessage: unknown
}

router.get('',async (req,res) => {
    try{
        const serviceLayerResponse = await getReviews();
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
        const serviceLayerResponse = await getReviewsbyId(id);

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
        const serviceLayerResponse = await postReview(body);

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
        const serviceLayerResponse = await putReview(id,body);

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
        const serviceLayerResponse = await deleteReview(id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const customError = error as CustomErrorFormat;
        console.log (customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
})

export default router;