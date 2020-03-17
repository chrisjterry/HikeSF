import React from "react";
import { Link } from "react-router-dom";
import Buttercup1 from "./buttercup1.png";


class PetShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //   debugger
    this.props.fetchTrail(this.props.match.params.id);
    window.scrollTo(0, 0);
  }

  render() {
    const { trail } = this.props;

    if (!trail) return null;
    // if (!trail.photos) return null;

    return (
      <div className="trail-show">
        <h1>Trail title goes here-{trail.title}</h1>
        <Link to={`/trails/${trail.id}`}>
          <img src={Buttercup1} height="300px" width="300px"></img>
        </Link>
        <div>Description - {trail.description}</div>
        <div>Rating - ★★★★★</div>
      </div>
    );
  }
}

export default PetShow;
