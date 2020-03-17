const express = require('express');
const router = express.Router();
const passport = require('passport');
const Review = require('../../models/Review');
const validateReviewInput = require('../../validation/reviews');

router.get('/trail/:trail_id', (req, res) => {
    Review.find({trail: req.params.trail_id})
        .sort({ date: -1 })
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json({ noReviewsFound: 'This trail has no reviews' }));
});

router.get('/user/:user_id', (req, res) => {
    Review.find({user: req.params.user_id})
        .sort({ date: -1 })
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json({ noReviewsFound: 'This user has not reviewed a trail yet' }));
});

router.post('/', passport.authenticate('jwt', { session: false }),
(req, res) => {
    const { errors, isValid } = validateReviewInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newReview = new Review({
        text: req.body.text,
        rating: req.body.rating,
        user: req.user.id,
        trail: req.body.trail
    });

    newReview.save().then(review => res.json(review));
});

module.exports = router;