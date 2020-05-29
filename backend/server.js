const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.unsubscribe(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri ,{ useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB database connection establish successfully");
});

const providerRouter = require('./routes/providers');
const custRouter = require('./routes/customers')
const tripRouter = require('./routes/trips')
const reviewRouter = require('./routes/reviews')
const bookingRouter = require('./routes/bookings')
const sendEmailRouter = require('./routes/sendEmails')

app.use('/provider',providerRouter);
app.use('/customer',custRouter);
app.use('/trip',tripRouter);
app.use('/review',reviewRouter);
app.use('/booking',bookingRouter);
app.use('/sendEmail', sendEmailRouter);

app.listen(port, () => {
    console.log('Server is running on port :' , port);
});