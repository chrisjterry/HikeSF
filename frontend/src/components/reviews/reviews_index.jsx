import React from "react";
// import { Link } from "react-router-dom";

class ReviewIndex extends React.Component {
  // constructor(props) {
  //     super(props);
  // }

  componentDidMount() {
    this.props.fetchReviews(this.props.currentTrail.id);
  }

  render() {
    // debugger
    return (
      <div>
        <h3>All reviews???</h3>
        {this.props.reviews.map((review, i) => (
          <div>
            {review}
          </div>
        ))}
      </div>
    );
  }
}

export default ReviewIndex;
