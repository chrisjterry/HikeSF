const express = require('express');
const router = express.Router();
const passport = require('passport');
const Trail = require('../../models/Trail');
const validateTrailInput = require('../../validation/trails');

router.get('/', (req, res) => {
    req.body.east = req.body.east || 180;
    req.body.west = req.body.west || -180;
    req.body.north = req.body.north || 180;
    req.body.south = req.body.south || -180;

    Trail.find({
        lat: { $gte: req.body.west },
        lat: { $lte: req.body.east },
        lng: { $gte: req.body.south },
        lng: { $lte: req.body.north }
     })
        .sort({ date: -1 })
        .then(trails => res.json(trails))
        .catch(err => res.status(404).json({ noTrailsFound: 'No hikes found' }));
});

router.get('/:id', (req, res) => {
    Trail.findById(req.params.id)
        .then(trail => res.json(trail))
        .catch(err =>
            res.status(404).json({ noTrailFound: 'No hike found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateTrailInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
      
      const newTrail = new Trail({
        title: req.body.title,
        description: req.body.description,
        difficulty: req.body.difficulty,
        petFriendly: req.body.petFriendly,
        paved: req.body.paved,
        lat: req.body.lat,
        lng: req.body.lng,
        user: req.user.id
      });
  
      newTrail.save().then(trail => res.json(trail));
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Trail.findById(req.params.id)
            .then(trail => {
                if (trail.user.equals(req.user.id)) {
                    trail.remove();
                    Trail.find()
                        .sort({ date: -1 })
                        .then(trails => res.json(trails))
                        .catch(err => res.status(404).json({ noTrailsFound: 'No hikes found' }));
                } else {
                    res.status(404).json({ noPermission: 'You do not have permission to do that' });
                }
            })
    }
);

module.exports = router;