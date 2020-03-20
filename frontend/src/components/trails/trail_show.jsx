import React from "react";
import { Link } from "react-router-dom";
import Buttercup1 from "./buttercup1.png";
import ReviewsIndexContainer from '../reviews/reviews_index_container';
import '../../stylesheets/trail_show.css'

class TrailShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({loaded:false}, this.state);
  }
  componentWillMount() {
    //   debugger
    this.props.fetchTrail(this.props.match.params.id).
    then(() => {this.setState({loaded: true})})
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.props.fetchWeather({
      lat: this.props.trail.lat,
      lng: this.props.trail.lng
    })
  }
  
  render() {
    const { trail, weather } = this.props;
    // if (!trail) return null;
    // if (!trail.photos) return null;
    if(!weather) return null;
    // debugger
    
    if (!this.state.loaded) {
      return (
        <div>not loaded</div>
      );
    }
    return (
      <div className="trail-show">
        <h1>Trail title goes here-{trail.title}</h1>
        <Link to={`/trails/${trail.id}`}>
          <img src={Buttercup1} height="300px" width="300px"></img>
        </Link>
        <div className="weather-container">
          <div className="weather-info">
            {weather.summary}
            {weather.temperature}
            {weather.windSpeed}
            {weather.precipProbability}
            {weather.humidity}
          </div>
        </div>
        <div>Description - {trail.description}</div>
        <div>Rating - ★★★★★</div>
        <ReviewsIndexContainer />
      </div>
    );
  }
}
export default TrailShow;
