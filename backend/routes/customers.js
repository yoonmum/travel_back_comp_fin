const router = require('express').Router();
const Customer = require('../models/cust.model');
// const uri = process.env.ATLAS_URI;

router.get('/',(req, res) => {
  Customer.find()
    .then(cus_name => res.json(cus_name))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id',(req, res) => {
  Customer.findById(req.params.id)
    .then(cus => res.json(cus))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',(req, res) => {
  const cusname = req.body.cus_name;
  const cusmail = req.body.cus_email;
  const cusphone = req.body.cus_phone;
  const newCustomer = new Customer( {"cus_name" : cusname , "cus_email" :cusmail , "cus_phone" :cusphone});

  newCustomer.save()
    .then(() => res.json(newCustomer._id))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;