const router = require('express').Router();
const Trip = require('../models/trip.model');
// const uri = process.env.ATLAS_URI;

router.get('/',(req, res) => {
  Trip.find()
    .then(trip => res.json(trip))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',(req, res) => {
  const tripprice = req.body.trip_price;
  const tripstatus = req.body.trip_status;
  const tripname = req.body.trip_name;
  const tripreview = req.body.trip_review;
  const triptype = req.body.trip_type;
  const tripprovince = req.body.trip_province;
  const tripdistrict = req.body.trip_district;
  const tripdate = req.body.trip_date;
  const proviid = req.body.provi_id;
  const newTrip = new Trip( {"trip_price" : tripprice , "trip_status" :tripstatus , "trip_name" :tripname
  , "trip_review" :tripreview , "trip_type" :triptype, "trip_province" :tripprovince , "trip_district" :tripdistrict
  , "trip_date" :tripdate , "provi_id" :proviid});

  newTrip.save()
    .then(() => res.json('Trip added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id',(req, res) => {
  Trip.findById(req.params.id)
    .then(trip => {
      trip.trip_price = req.body.trip_price;
      trip.trip_status = req.body.trip_status;
      trip.trip_name = req.body.trip_name;
      trip.trip_review = req.body.trip_review;
      trip.trip_type = req.body.trip_type;
      trip.trip_province = req.body.trip_province;
      trip.trip_district = req.body.trip_district;
      trip.trip_date = req.body.trip_date;
      

      trip.save()
        .then(() => res.json('Trip update'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id',(req, res) => {
  Trip.findByIdAndDelete(req.params)
    .then(() => res.json('Trip deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;