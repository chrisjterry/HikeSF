import React from "react";
import { Link } from "react-router-dom";
// import StarRatings from "react-star-ratings";
import Buttercup1 from "./buttercup1.png";
import ReviewsIndexContainer from '../reviews/reviews_index_container';
import ShowMap from '../map/show_map';
import "../../stylesheets/trail_show.css";

class TrailShow extends React.Component {
  constructor(props) {
    super(props);
    // this.state = Object.assign({loaded:false}, this.state);
  }
  
  componentWillMount() {
    //   debugger
    //  this.props.fetchWeather({
    //    lat: this.props.trail.lat,
    //    lng: this.props.trail.lng
    //  });
    // this.props.fetchTrail(this.props.match.params.id)
    // .then(() => {this.setState({loaded: true})})
    // window.scrollTo(0, 0);
  }

  componentDidMount() {
        this.props.fetchTrail(this.props.match.params.id);

    this.props.fetchWeather({
      lat: this.props.trail.lat,
      lng: this.props.trail.lng
    })
  }
  
  render() {
    const { trail, weather } = this.props;
    if (!trail.difficulty) return null;
    // if (!trail.photos) return null;
    if(!weather) return null;
    // debugger
    
    // if (!this.state.loaded) {
    //   return (
    //     <div>not loaded</div>
    //   );
    // }

    return (
      <div className='trail-show-container'>
        <div className="trail-show">
          <h1 className="trail-title">Trail title goes here-{trail.title}</h1>
          <ShowMap lat={this.props.trail.lat} lng={this.props.trail.lng} waypoints={this.props.trail.waypoints} />
          <div className="trail-show-link">
            <Link className="trail-show-link" to={`/trails/${trail.id}`}>
              <img src={Buttercup1} height="300px" width="300px"></img>
            </Link>
            <div className="weather-container">
              <div className="weather-info">
                <p>Condition: {weather.summary}</p>
                <p>Temperature: {weather.temperature}°F</p>
                <p>Wind: {weather.windSpeed} mph</p>
                <p>Chance of Rain: {weather.precipProbability}</p>
                <p>Humidity: {weather.humidity}</p>
              </div>
            </div>
          </div>
          <div className="trail-descrption">
            Description - {trail.description}
            Difficulty - {trail.difficulty}
          </div>
          <div className="reviews-container">
            <ReviewsIndexContainer />
          </div>
        </div>
      </div>
    );
  }
}
export default TrailShow;

