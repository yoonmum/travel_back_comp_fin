const router = require('express').Router();
const Provider = require('../models/provi.model');
const Trip = require('../models/trip.model');
// const uri = process.env.ATLAS_URI;

router.get('/',(req, res) => {
  Provider.find()
    .then(provi_name => res.json(provi_name))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id',(req, res) => {
  Provider.findById(req.params.id)
    .then(provider => res.json(provider))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',(req, res) => {
  const proviname = req.body.provi_name;
  const proviphone = req.body.provi_phone;
  const proviaccount = req.body.provi_account_number ;
  const proviemail = req.body.provi_email;
  const provitrip = req.body.provid_trip;
  const newProvider = new Provider( {"provi_name" : proviname , 
  "provi_phone" :proviphone ,
  "provi_account_number" : proviaccount, 
  "provi_email" : proviemail ,
  "provi_trip" : provitrip
});

  newProvider.save()
    .then(() => res.json('Provider added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:providerID/trip',(req, res) => {

    Trip.find({ provi_id : $providerID }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});

module.exports = router;