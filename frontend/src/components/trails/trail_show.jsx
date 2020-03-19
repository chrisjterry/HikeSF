import React from "react";
import { Link } from "react-router-dom";
import Buttercup1 from "./buttercup1.png";
import ReviewsIndexContainer from '../reviews/reviews_index_container';


class TrailShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({loaded:false}, this.state);
  }

  componentDidMount() {
    //   debugger
    this.props.fetchTrail(this.props.match.params.id).
    then(() => {this.setState({loaded: true})})
    window.scrollTo(0, 0);
  }

  render() {
    const { trail } = this.props;

    // if (!trail) return null;
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
