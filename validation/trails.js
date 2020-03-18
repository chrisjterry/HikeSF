const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTrailInput(data) {
    debugger
    let errors = {};
    console.log(data)
    data.title = validText(data.title) ? data.title : '';
    data.description = validText(data.description) ? data.description : '';
    data.difficulty = validText(data.difficulty) ? data.difficulty : '';
    data.petFriendly = validText(data.petFriendly) ? data.petFriendly : '';
    data.paved = validText(data.paved) ? data.paved : '';
    data.lat = validText(data.lat) ? data.lat : '';
    data.lng = validText(data.lng) ? data.lng : '';
    
    if (Validator.isEmpty(data.title)) {
      errors.title = 'Title must be included';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description must be included';
    }

    if (!Validator.isIn(data.difficulty, ['easy', 'moderate', 'hard'])) {
        errors.difficulty = 'Difficulty must be selected';
    }
    
    if (!Validator.isBoolean(data.petFriendly)) {
        errors.petFriendly = 'Pet-friendly status must be indicated';
    }

    if (!Validator.isBoolean(data.paved)) {
        errors.paved = 'Trail paving status must be indicated';
    }

    if (!Validator.isNumeric(data.lat)) {
        errors.lat = 'Latitude must be a valid number';
    }

    if (!Validator.isNumeric(data.lng)) {
        errors.lng = 'Longitude must be a valid number';
    }
  
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
};