const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateReviewInput(data) {
    let errors = {};

    data.text = validText(data.text) ? data.text : '';
    data.rating = validText(data.rating) ? data.rating : '';

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Review text cannot be empty'
    }

    if (Validator.isEmpty(data.rating)) {
        errors.rating = 'Rating is required'
    }

    if (!Validator.isNumeric(data.rating, { min: 1, max: 5 })) {
        errors.rating = 'Rating must be a number from 1 to 5'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};