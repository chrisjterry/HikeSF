import React from "react";
import { Link } from "react-router-dom";

class TrailIndex extends React.Component {
  // constructor(props) {
  //     super(props);
  // }

  componentDidMount() {
    this.props.fetchReviews();
  }

  render() {
    // debugger
    return (
      <div>
        <h3>All reviews???</h3>
        {this.props.trails.map((trail, i) => (
          <div>
            
          </div>
        ))}
      </div>
    );
  }
}

export default TrailIndex;
