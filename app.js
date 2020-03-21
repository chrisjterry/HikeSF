const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys.js').mongoURI;
const DarkSkyKey = require('./config/keys.js').DarkSkyAPIKey;
const users = require('./routes/api/users');
const trails = require('./routes/api/trails');
const reviews = require('./routes/api/reviews');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const axios = require('axios')
const path = require('path');

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);

require('./config/passport')(passport);
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/trails", trails);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/reviews", reviews);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/weather', async (req, res) => {

    const { lng, lat } = req.body;

    const darkSkyURL = `https://api.darksky.net/forecast/${DarkSkyKey}/${lat},${lng}?exclude=[minutely,hourly,daily,flags]`;

    // const data = await axios.get(darkSkyURL);
    // console.log(res)
    // res.json({
    //     data: data.data
    // })

    axios.get(darkSkyURL)
        .then(data => {
            // console.log('Good request: ', req)
            // console.log('Response data: ', data)
            return res.json({data: data.data})
        })
        .catch(err => {
            // console.log('Bad request: ', req)
            return res.status(404).json(err)
        })
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}