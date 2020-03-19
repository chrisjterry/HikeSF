import React from "react";
import NewReviewForm from "./new_review_form_container";
// import { Link } from "react-router-dom";

class ReviewIndex extends React.Component {
  constructor(props) {
      super(props);
      this.state = Object.assign({ loaded: false }, this.state);
  }

  componentDidMount() {
    // debugger
    this.props
      .fetchTrailReviews(this.props.currentTrail._id)
      // .then(() => (this.setState({loaded: true})));
      .then(() => { this.setState({ loaded: true })});
      
  }

  trailsList() {
    console.log(this.props.reviews)
    if (Object.keys(this.props.reviews.data).length < 1) {
      return(
        <div>No reviews yet</div>
      )
    } else {
      // return(<div>You got some Reviews</div>)
      return(
        <div>
          {this.props.reviews.data.map(review => <div>
            {review.text}<br />
            {review.rating}<br />
            {review.date}<br />
            {review.user}<br />
            </div>)}
        </div>
      )
    }
  }

  render() {
    if(!this.state.loaded){
      return(
        <div>not loaded</div>
      );
    }
     console.log(this.props)
    return (
      <div>
        <h3>All reviews???</h3>
        {this.trailsList()}
        <NewReviewForm />
      </div>
    );
  }
}

export default ReviewIndex;
