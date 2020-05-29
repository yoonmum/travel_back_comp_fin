const router = require('express').Router();
const Booking = require('../models/booking.model');
// const uri = process.env.ATLAS_URI;

router.get('/',(req, res) => {
  Booking.find()
    .then(cus_name => res.json(cus_name))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/add',(req, res) => {
  const tripid = req.body.trip_id;
  const cusid = req.body.cus_id;
  const bkstatus = req.body.bk_status;
  const newBooking = new Booking( {"bk_status" : bkstatus, "trip_id" : tripid , "cus_id" : cusid});

  newBooking.save()
    .then(() => res.json(newBooking._id))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;