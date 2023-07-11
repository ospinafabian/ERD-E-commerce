import { Review } from '../types/reviews.types';
import {ReviewSchema} from '../schemas/reviews.schema';


const readReviews = (): Promise < Review[] > => {
    return new Promise ( async (resolve,reject) => {
        try {
            const mongoResponse = await ReviewSchema.find();
            resolve(mongoResponse);
        } catch (error) {
            reject(error);
        }
    });
};

const readReviewsByName = (customerId: string) => {
    return new Promise (async (resolve, reject) => {
        try {
            const mongoResponse = await ReviewSchema.findOne({customerId: customerId});

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

const createReview = (body: Review) => {
    return new Promise (async (resolve, reject) => {
        try {
            const review = new ReviewSchema(body);
            await review.save();
            resolve ('A new review has been added');
        } catch (error) {
            reject (error);
        }
    });
};

const updateReview = (id: string, body: Review) => {
    return new Promise (async (resolve,reject) => {
        try {
            const updateEntity = await ReviewSchema.findByIdAndUpdate(id,body, {new:true});

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

const deleteReviewById = (id: string) =>{
    return new Promise (async (resolve, reject) => {
        try {
            const deletedEntity = await ReviewSchema.findByIdAndRemove(id);

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
    readReviews,
    readReviewsByName,
    createReview,
    updateReview,
    deleteReviewById
};
