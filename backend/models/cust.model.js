const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const custSchema = new Schema({
    cus_name : {
        type : String ,
        minlength : 2,
        required : true,
        trim : true
    },
    cus_email : {
        type : String,
        required : true,
        trim : true
    },
    cus_phone : {
        type : String,
        minlength : 10,
        maxlength : 10,
        trim : true
    },
    cus_review : [{
        type : Schema.Types.ObjectId,
        ref : 'Review'
    }]
});

const Customer = mongoose.model('Customer', custSchema);

module.exports = Customer;