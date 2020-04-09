# Demo and Screenshots
[Live Demo](https://hike-sf.herokuapp.com/#/)

![Splash](./screenshots/splash.png)
![Trails](./screenshots/trails.png)
![Trail](./screenshots/trail.png)

# Background and Overview
HikeSF is a web application that empowers outdoor enthusiasts in and around the San Francisco Bay area to share their favorite hiking trails. In the first entirely crowd-sourced application of its kind, HikeSF allows users to post, experience, and review hikes all in one place. To that effect, our team built:

* A full stack web application using the MERN framework (MongoDB, Express, React and Node)
* Connections to the Google Maps and Dark Sky Weather APIs to provide visualization and real-time data on hikes in the Bay
* A modern, easy-to-use UI / UX that provides a seamless experience across devices

# Functionality
### User Authentication
Users can sign up for an account, login and logout, and persist their account on one device. The application first validates registrant / returning user information, using bcrypt to hash password data. It then stores a JSON Web Token in local storage in order to authenticate and persist a logged in user via Passport on the backend.

**Login Backend**:
```
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({email})
      .then(user => {
        if (!user) {
          return res.status(404).json({email: 'This user does not exist'});
        }
  
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            const payload = {id: user.id, email: user.email};

            jwt.sign(
                payload,
                keys.secretOrKey,
                {expiresIn: 3600},
                (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
              });
            } else {
                return res.status(400).json({password: 'Incorrect password'});
            }
        })
      })
})
```

**Login Frontend**: 
```
export const login = user => dispatch =>
  APIUtil.login(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    });
```

### Ability to create and review hiking trails
Users can create trails via an input form alongside an interactive Google Maps display, which allows them add waypoints to the trail. Users can also review trails that other users have created, giving them a 1-5 star rating.

**Trails Creation Backend:**
```
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
```

**Reviews Creation Backend:**
```
router.post('/', passport.authenticate('jwt', { session: false }),
(req, res) => {
    const { errors, isValid } = validateReviewInput(req.body);

    if (!isValid) {
        return res.status(403).json(errors);
    }

    const newReview = new Review({
        text: req.body.text,
        rating: req.body.rating,
        user: req.user.id,
        trail: req.body.trail
    });

    newReview.save().then(review => res.json(review));
});
```

### Interactive map display via Google Maps API
When viewing a trail, all data stored in the relevant trail and review collections of MongoDB are retreived and sent to the frontend. The trail waypoints, having been stringified prior to storage, are parsed and displayed on a Google Maps component. The React Star Ratings library is used to display star ratings based on the integer stored in the database.

**Google Maps React Component:**
```
componentDidMount() {
    const map = this.refs.map;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    const mapOptions = {
      center: {
        lat: this.state.lat,
        lng: this.state.lng
      },
      zoom: 15
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.directionsRenderer.setMap(this.map);
    this.directionsRenderer.setOptions({ preserveViewport: true });
    this.directionsService.route({
      origin: this.state.origin,
      destination: this.state.waypoints[this.state.waypoints.length - 1],
      waypoints: this.state.waypoints.slice(0, this.state.waypoints.length - 1),
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response)
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  
  render() {
    return (
      <div className="show-map" ref="map">
        Map
      </div>
    );
}
```

**Star Ratings React Component:**
```
<StarRatings
    rating={this.state.avg_rating}
    changeRating={this.changeRating}
    starDimension="20px"
    starSpacing="1px"
    starRatedColor="blue"
/>
```

### Real-time weather stats via Dark Sky API
Real-time weather data is fetched from the Dark Sky API using trail latitude and longitude coordinates every time a user views an individual trail.

**Frontend API Call:**
```
componentDidUpdate() {
    if (this.props.trail.lat && !Object.keys(this.props.weather).length) {
      this.props.fetchWeather({
        lat: this.props.trail.lat,
        lng: this.props.trail.lng
      })
      window.scrollTo(0, 0);
    }
  }
```

**Backend API Call:**
```
app.post('/api/weather', async (req, res) => {
    const { lng, lat } = req.body;
    const darkSkyURL = `https://api.darksky.net/forecast/${DarkSkyKey}/${lat},${lng}?exclude=[minutely,hourly,daily,flags]`;

    axios.get(darkSkyURL)
        .then(data => {
            // console.log('Good request: ', req)
            // console.log('Response data: ', data)
            return res.json({data: data.data})
        })
        .catch(err => {
            // console.log('Bad request: ', req)
            return res.status(404).json(err)
        });
})
```

### Image hosting via AWS
Multer-S3 middleware was utilized to upload trail images to AWS S3.

**Frontend File / FormData Handling:**
```
handleFile(e) {
        e.preventDefault();
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
            this.setState({picture: file, picture_url: fileReader.result});
        };

        if (file) fileReader.readAsDataURL(file);
    }

    handleSubmit(e) {
        e.preventDefault();
        const trail = {
            title: this.state.title,
            description: this.state.description,
            difficulty: this.state.difficulty,
            petFriendly: this.state.petFriendly.toString(),
            paved: this.state.paved.toString(),
            lat: this.state.lat,
            lng: this.state.lng,
            waypoints: JSON.stringify(this.state.waypoints),
            user: this.props.currentUser,
            date: this.state.date,
            picture: this.state.picture
        };
        const formData = new FormData();
        Object.keys(trail).forEach( key => {
            if (trail[key]) formData.append(`${key}`, trail[key])
        });
        this.props.createTrail(formData)
        .then(() => {
              if (this.props.errors.length === 0)
                this.props.history.push(`/trails`);
            });
}
```

**Backend Multer Configuration:**
```
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
```

# Technologies and Technical Challenges
HikeSF's reliance on the network effect and therefore the need to rapidly grow to accommodate new users demands a lean and scalable architecture. For that purpose, our team is using a MERN stack (MongoDB, Express, React and Node).

#### Backend: MongoDB, Express, Node.js

MongoDB is a NoSQL database program that affords clients a fast, reliable, and most importantly highly scalable document-oriented database configuration. Express is an open-source framework for the Node.js runtime environment that has become the de facto backend JavaScript framework due to its robust features and high performance.

Technical Challenges:
Collecting data from Google Maps and storing in the database. Gathering real-time (we may only pull this information periodically at scale) weather forecast for any location selected from Google Maps. 

#### Frontend: React / Redux

The React JavaScript frontend library provides ease-of-use in building the interface of our application and will allow our team to quickly respond to changes in customer demand and sentiment. The Redux library for managing application state compliments React and amplifies our team's ability to quickly build new pages and features. 

Technical Challenges:
Rendering updated information (weather info, trail directions, etc.) from MongoDB on request (ex: fetching data). 

# Team Members
**Victoria Campbell, Jeff Lui, Jordan Tom and Chris Terry**