const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer  = require('multer');
const multerS3 = require('multer-s3')
const aws = require('aws-sdk');
const AWSAccessKeyId = require('../../config/keys').AWSAccessKeyId;
const AWSSecretKey = require('../../config/keys').AWSSecretKey;
const AWSBucket = require('../../config/keys').AWSBucket;
const Trail = require('../../models/Trail');
const validateTrailInput = require('../../validation/trails');

aws.config.update({
    region: 'us-west-1',
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey
});
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWSBucket,
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '.jpg')
      }
    })
});

router.get('/', (req, res) => {
    req.query.east = req.query.east || 180;
    req.query.west = req.query.west || -180;
    req.query.north = req.query.north || 180;
    req.query.south = req.query.south || -180;

    Trail.find({
        $and: [
            { lat: { $gte: req.query.south } },
            { lat: { $lte: req.query.north } }
        ],
        $and: [
            { lng: { $gte: req.query.west } },
            { lng: { $lte: req.query.east } }
        ]
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

router.post('/new',
    upload.single('picture'),
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        if (req.body.petFriendly) req.body.petFriendly = req.body.petFriendly.toString()
        if (req.body.paved) req.body.paved = req.body.paved.toString();
        if (req.body.lat) req.body.lat = req.body.lat.toString();
        if (req.body.lng) req.body.lng = req.body.lng.toString();
        
      const { errors, isValid } = validateTrailInput(req.body);
      
      if (!isValid) {
        return res.status(401).json(errors);
      }
      if (!req.file) {
          return res.status(401).json({ photo: 'A photo of the hike must be uploaded' })
      }
      
      const newTrail = new Trail({
        title: req.body.title,
        description: req.body.description,
        difficulty: req.body.difficulty,
        petFriendly: req.body.petFriendly,
        paved: req.body.paved,
        lat: req.body.lat,
        lng: req.body.lng,
        waypoints: req.body.waypoints,
        picture_url: req.file.location,
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
                    trail.remove()
                    Trail.find({user: req.user.id})
                        .sort({ date: -1 })
                        .then(trails => res.json(trails))
                        .catch(err => res.status(404).json({ noTrailsFound: 'No hikes found' }));
                } else {
                    res.status(404).json({ noPermission: 'You do not have permission to do that' });
                }
            })
    }
);

router.get(`/user/:userId`, (req, res) =>{
    Trail.find({user: req.params.userId})
        .sort({ date: -1 })
        .then(trails => res.json(trails))
        .catch(err => res.status(404).json({ noTrailsFound: 'This user has not created a trail yet'}));
});

module.exports = router;