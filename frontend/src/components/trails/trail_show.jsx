import React from "react";
import { Link } from "react-router-dom";
import Buttercup1 from "./buttercup1.png";
import ReviewsIndexContainer from '../reviews/reviews_index_container';


class TrailShow extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount() {
    this.props.fetchTrail(this.props.match.params.id);
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

    if (!trail) return null;
    if (!weather) return null;
    // if (!trail.photos) return null;

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
        <div>Description - {trail.description}</div>
        <div>Rating - ★★★★★</div>
        <ReviewsIndexContainer />
      </div>
    );
  }
}

export default TrailShow;
