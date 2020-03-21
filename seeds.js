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
        title: 'The Embarcadero Hike',
        description: 'Enjoy the best walk along the pier',
        difficulty: 'easy',
        petFriendly: 'true',
        paved: 'true',
        lat: '37.794446',
        lng: '-122.393375',
        waypoints: JSON.stringify(["{\"lat\":37.80761468740656,\"lng\":-122.41052597338867}","{\"lat\":37.805850835522065,\"lng\":-122.42271423339844}","{\"lat\":37.80710538712925,\"lng\":-122.42835760116577}"]),
        picture_url: 'https://hike-sf.s3.us-west-1.amazonaws.com/1584826842275.jpg',
        user: newUser._id
    }).save((err, newTrail) => {
        if(err) console.log(err);
        new Review({
            text: 'Way better than walking through downtown.',
            rating: '4',
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
        title: 'The Perimeter of Golden Gate Park',
        description: 'Walk the perimeter of the park before heading inside',
        difficulty: 'easy',
        petFriendly: 'true',
        paved: 'true',
        lat: '37.764049286471234',
        lng: '-122.50984025721034',
        waypoints: JSON.stringify(["{\"lat\":37.76635623697312,\"lng\":-122.4529201272456}","{\"lat\":37.774294310865834,\"lng\":-122.45480840239209}","{\"lat\":37.77083422958041,\"lng\":-122.51085584196728}","{\"lat\":37.76942564512426,\"lng\":-122.4862289428711}","{\"lat\":37.76942564512426,\"lng\":-122.4862289428711}"]),
        picture_url: 'https://hike-sf.s3.us-west-1.amazonaws.com/1584827347561.jpg',
        user: newUser._id
    }).save((err, newTrail) => {
        if(err) console.log(err);
        new Review({
            text: 'Any route that takes me away from that building works for me.',
            rating: '4',
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
        title: 'Mt. Davidson - The Long Way',
        description: 'Why walk straight to the top when you can walk all the way around first?',
        difficulty: 'hard',
        petFriendly: 'true',
        paved: 'false',
        lat: '37.73921032629333',
        lng: '-122.45784044265747',
        waypoints: JSON.stringify(["{\"lat\":37.739458753265815,\"lng\":-122.4545228896576}","{\"lat\":37.738992110503766,\"lng\":-122.45294575075684}","{\"lat\":37.73893034004947,\"lng\":-122.45386004447937}","{\"lat\":37.738864843785436,\"lng\":-122.45437268595276}"]),
        picture_url: 'https://hike-sf.s3.us-west-1.amazonaws.com/1584827566570.jpg',
        user: newUser._id
    }).save((err, newTrail) => {
        if(err) console.log(err);
        new Review({
            text: 'Great hike, but only bring people who walk fast',
            rating: '4',
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
        title: 'Glen Canyon Hike',
        description: 'For those looking for a more rigorous hike',
        difficulty: 'hard',
        petFriendly: 'false',
        paved: 'false',
        lat: '37.7439016148603',
        lng: '-122.44226822584324',
        waypoints: JSON.stringify(["{\"lat\":37.742007737453754,\"lng\":-122.44119564651068}","{\"lat\":37.74092111810636,\"lng\":-122.44121653583775}","{\"lat\":37.74200416729339,\"lng\":-122.44323923742594}"]),
        picture_url: 'https://hike-sf.s3.us-west-1.amazonaws.com/1584828750966.jpg',
        user: newUser._id
    }).save((err, newTrail) => {
        if(err) console.log(err);
        new Review({
            text: 'Great hike. Perfect for getting away from the city.',
            rating: '5',
            user: newUser._id,
            trail: newTrail._id    
        }).save((err, newReview) => {
            if(err) console.log(err);
            mongoose.disconnect();
        });
    });
});