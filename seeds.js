const User = require('./models/User');
const Trail = require('./models/Trail');
const Review = require('./models/Review');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

User.collection.remove({});
Trail.collection.remove({});
Review.collection.remove({});

new User({
    email: 'jordan@gmail.com',
    password: 'password',
}).save((err, newUser) => {
    if(err) console.log(err);
    new Trail({
        title: 'sample title',
        description: 'sample description',
        difficulty: 'easy, moderate, or hard',
        petFriendly: 'true or false',
        paved: 'true or false',
        lat: 'sample lat',
        lng: 'sample lng',
        waypoints: 'copy stringified from MongoDB',
        picture_url: 'get from AWS S3',
        user: newUser._id
    }).save((err, newTrail) => {
        if(err) console.log(err);
        new Review({
            text: 'sample text',
            rating: '1 through 5',
            user: newUser._id,
            trail: newTrail._id    
        }).save((err, newReview) => {
            if(err) console.log(err);
        });
    });
});

new User({
    email: 'jeff@gmail.com',
    password: 'password',
}).save((err, newUser) => {
    if(err) console.log(err);
    new Trail({
        title: 'sample title',
        description: 'sample description',
        difficulty: 'easy, moderate, or hard',
        petFriendly: 'true or false',
        paved: 'true or false',
        lat: 'sample lat',
        lng: 'sample lng',
        waypoints: 'copy stringified from MongoDB',
        picture_url: 'get from AWS S3',
        user: newUser._id
    }).save((err, newTrail) => {
        if(err) console.log(err);
        new Review({
            text: 'sample text',
            rating: '1 through 5',
            user: newUser._id,
            trail: newTrail._id    
        }).save((err, newReview) => {
            if(err) console.log(err);
        });
    });
});

new User({
    email: 'victoria@gmail.com',
    password: 'password',
}).save((err, newUser) => {
    if(err) console.log(err);
    new Trail({
        title: 'sample title',
        description: 'sample description',
        difficulty: 'easy, moderate, or hard',
        petFriendly: 'true or false',
        paved: 'true or false',
        lat: 'sample lat',
        lng: 'sample lng',
        waypoints: 'copy stringified from MongoDB',
        picture_url: 'get from AWS S3',
        user: newUser._id
    }).save((err, newTrail) => {
        if(err) console.log(err);
        new Review({
            text: 'sample text',
            rating: '1 through 5',
            user: newUser._id,
            trail: newTrail._id    
        }).save((err, newReview) => {
            if(err) console.log(err);
        });
    });
});

new User({
    email: 'chris@gmail.com',
    password: 'password',
}).save((err, newUser) => {
    if(err) console.log(err);
    new Trail({
        title: 'sample title',
        description: 'sample description',
        difficulty: 'easy, moderate, or hard',
        petFriendly: 'true or false',
        paved: 'true or false',
        lat: 'sample lat',
        lng: 'sample lng',
        waypoints: 'copy stringified from MongoDB',
        picture_url: 'get from AWS S3',
        user: newUser._id
    }).save((err, newTrail) => {
        if(err) console.log(err);
        new Review({
            text: 'sample text',
            rating: '1 through 5',
            user: newUser._id,
            trail: newTrail._id    
        }).save((err, newReview) => {
            if(err) console.log(err);
            mongoose.disconnect();
        });
    });
});