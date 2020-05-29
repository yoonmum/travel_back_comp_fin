const router = require('express').Router();
const Review = require('../models/review.model');
// const uri = process.env.ATLAS_URI;

router.get('/',(req, res) => {
  Review.find()
    .then(cus_name => res.json(cus_name))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/add',(req, res) => {
  const tripid = req.body.trip_id;
  const cusid = req.body.cus_id;
  const detail = req.body.review_detail;
  const newReview = new Review( {"review_detail" : detail, "trip_id" : tripid , "cus_id" : cusid});

  newReview.save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;