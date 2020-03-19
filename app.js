const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const DarkSkyKey = require('./config/keys').DarkSkyAPIKey;
const users = require('./routes/api/users');
const trails = require('./routes/api/trails');
const reviews = require('./routes/api/reviews');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const axios = require('axios')

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
    console.log(req.body)

    const { lng, lat } = req.body;

    const darkSkyURL = `https://api.darksky.net/forecast/${DarkSkyKey}/${lat},${lng}?exclude=[minutely,hourly,daily,flags]`;

    const data = await axios.get(darkSkyURL);

    res.json({
        data: data.data
    })
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));