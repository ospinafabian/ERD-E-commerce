import mongoose from "mongoose";
import { Review } from "../types/reviews.types";


const reviewSchema = new mongoose.Schema <Review>({
    customerId: {type: String, required: true},
    reviewId: {type: String, required: true},
    reviewComment: {type: String, required: true},
    rating:{type: String, required: true},
});

const ReviewSchema = mongoose.model("Reviews", reviewSchema);

export { ReviewSchema };

