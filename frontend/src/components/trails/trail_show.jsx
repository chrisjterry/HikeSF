import React from "react";
// import { Link } from "react-router-dom";
// import StarRatings from "react-star-ratings";
// import Buttercup1 from "./buttercup1.png";
import ReviewsIndexContainer from '../reviews/reviews_index_container';
import ShowMap from '../map/show_map';
import "../../stylesheets/trail_show.css";

class TrailShow extends React.Component {
  constructor(props) {
    super(props);
  }
    
  componentDidMount() {
    this.props.fetchTrail(this.props.match.params.id)
  }
  
  componentDidUpdate() {
    // console.log(!Object.keys(this.props.weather).length)
    if (this.props.trail.lat && !Object.keys(this.props.weather).length) {
      this.props.fetchWeather({
        lat: this.props.trail.lat,
        lng: this.props.trail.lng
      })
      window.scrollTo(0, 0);
    }
  }
  
  render() {
    const { trail, weather } = this.props;
    // console.log(weather)
    if(!Object.keys(weather).length || trail._id !== this.props.match.params.id) return null;
    
    return (
      <div className="trail-show-container">
        <div className="trail-show">
          <div className="trail-show-top">
            {/* <h1 className="trail-title">{trail.title}</h1> */}
            <div className="show-page-picture-container">
              <div className="trail-show-link" to={`/trails/${trail.id}`}>
                <img
                  className="trail-show-pic"
                  src={trail.picture_url}
                  // height="300px"
                  // width="300px"
                ></img>
              </div>
            </div>
          </div>

          <br />
          <br />
          <div className="main-body-container">
            <div className="trail-description-container">
              <h1 className="trail-title">{trail.title}</h1>

              <div className="trail-description">
                <div className="trail-show-description">
                  <div className="trail-info-head">ABOUT THIS TRAIL</div>
                  <p>{trail.description}</p>
                </div>
                <div className="trail-show-difficulity">
                  <div className="trail-info-head">DIFFICULTY</div>
                  <p>{trail.difficulty}</p>
                </div>
                <br />
                <div className="reviews-container">
                  <ReviewsIndexContainer />
                </div>
              </div>
            </div>

            <div className="map-weather-container">
              <div className="show-page-map">
                <ShowMap
                  lat={this.props.trail.lat}
                  lng={this.props.trail.lng}
                  waypoints={this.props.trail.waypoints}
                />
              </div>

              <div className="weather-info">
                <p>☼ {weather.summary}</p>
                <br />
                <p>℉ {weather.temperature}</p>
                <br />
                <p>⇶ {weather.windSpeed} mph</p>
                <br />
                <p>☂ {Math.floor(weather.precipProbability * 100)}% chance</p>
                <br />
                <p>♨ {Math.floor(weather.humidity * 100)}% relative humidity</p>
                <br />
                <p>☺ 100% chance of having a great time</p>
              </div>
            </div>
          </div>

          {/* <div className="reviews-container">
            <ReviewsIndexContainer />
          </div> */}
        </div>
      </div>
    );
  }
}
export default TrailShow;

