const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    trail: {
        type: Schema.Types.ObjectId,
        ref: 'trails'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Review = mongoose.model('Review', ReviewSchema);