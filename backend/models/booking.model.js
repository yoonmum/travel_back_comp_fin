const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bk_status : {
       type : Boolean,
       required : true
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

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;