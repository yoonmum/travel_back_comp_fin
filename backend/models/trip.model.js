const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema({
    trip_price : {
        type : Number,
        required : true,
        trim : true
    },
    trip_status : {
        type : Boolean,
        required : true,

    },
    trip_name : {
        type : String ,
        required : true,
        minlength : 3 ,
        unique : true
    },
    trip_review :[ {
        ref : 'Review' ,
        type : Schema.Types.ObjectId
    }],
    trip_type : {
        type : String,
        required : true
    },
    trip_province : {
        type : String,
        required : true,
    },
    trip_district : {
        type : String ,
        required : true
    } , 
    trip_date : {
        type : Date 
    },
    provi_id : {
        ref : 'Provider',
        type : Schema.Types.ObjectId
    }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;