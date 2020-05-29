const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review_detail : {
       type : String
    } ,
    trip_id : {
        type : Schema.Types.ObjectId,
        ref : 'Trip',
        required : true
    },
    cus_id : {
        type : Schema.Types.ObjectId,
        ref : 'Customer',
        required : true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;