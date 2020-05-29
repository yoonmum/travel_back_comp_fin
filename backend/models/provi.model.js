const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const proviSchema = new Schema({
    provi_name : {
        type : String,
        required : true,
        trim : true,
        minlength : 2
    },
    provi_phone : {
        type : String,
        required : true,
        minlength : 10,
        maxlength : 10
    },
    provi_account_number : {
        type : String ,
        minlength : 10,
        maxlength : 10
    },
    provi_email : {
        type : String,
        required : true,
        trim : true
    },
    provid_trip : [{
        type : Schema.Types.ObjectId,
        reg : 'Trip'
    }]
   
});

const Provider = mongoose.model('Provider', proviSchema);

module.exports = Provider;