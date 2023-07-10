
import { Review } from "../types/reviews.types";
import {readReviews,
        readReviewsById,
        createReview,
        updateReview,
        deleteReviewById
} from '../data/reviews.data';

interface ServiceLayerResponse {
    code: number,
    result?: Review | Review[],
    message?: string,
    errorMessage?: unknown,
}

interface ServiceLayerResponse {
    code: number,
    result?: Review | Review[],
    message?: string,
    error?: unknown,
}


const getReviews = ():Promise <ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readReviews()
            .then((dataLayerResponse: Review[]) => {
                const localReviewsDB = dataLayerResponse;
                resolve({code: 200, result: localReviewsDB});
            })
            .catch((error) => {
            reject({code:500, message: "error inesperado", errorMessage: error});
        });
    });
};

const getReviewsbyId = (id:string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        readReviewsById(id)
        .then((dataLayerResponse) => {

            if ((dataLayerResponse as Review []).length === 0){
                resolve({code: 404, message: 'Review not found'});
            }else {
                resolve ({code:200, result: dataLayerResponse as Review });
            }
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const postReview = (body: Review): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        createReview(body)
        .then((dataLayerResponse) => {
            resolve({code: 201, message: dataLayerResponse as string });
        })
        .catch (error => {
            reject ({code: 500, message: 'Unexpected Error', errorMessage: error});
        });
    });
};

const putReview = (id: string, body: Review): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        updateReview(id, body)
        .then((dataLayerResponse) => {
            if (dataLayerResponse === 200){
                resolve ({code: 200, message: 'Review successfully updated' as string})
            }
        })
        .catch ( error => {
            if (error === 404){
                reject ({ code: 404, message: 'Review not found'});
            } else {
                reject ({code: 500, message: 'Unexpected error', errorMessage: error});
            }
        });
    });
};

const deleteReview = (id: string): Promise<ServiceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        deleteReviewById(id)
        .then ((dataLayerResponse) => {
            if (dataLayerResponse === 200) {
                resolve ({code: 200, message: "Review deleted"});
            }
        })
        .catch ((error) => {
            if (error === 404) {
                reject({code: 404, message: "Review doesn't exist"});
            } else {
                reject ({code: 500, message: "Unexpected error", errorMessage: error});
            }
        });
    });
};


export {
    getReviews,
    getReviewsbyId,
    postReview,
    putReview,
    deleteReview
};