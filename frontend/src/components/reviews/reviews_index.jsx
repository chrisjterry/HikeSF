import React from "react";
import NewReviewForm from "./new_review_form_container";
import StarRatings from "react-star-ratings";

// import { Link } from "react-router-dom";
import '../../stylesheets/reviews_index_container.css'

class ReviewIndex extends React.Component {
  constructor(props) {
    super(props);
    this.calcAvgRating = this.calcAvgRating.bind(this);
    this.state = Object.assign({ loaded: false, avg_rating: 5 }, this.state);
  }
  
  calcAvgRating() {
    let avg;
    let ratingsSum = 0;
      this.props.reviews.map(review => 
        ratingsSum += review.rating
      )
    avg = Math.floor(ratingsSum / (this.props.reviews.length));
    this.setState({ avg_rating: avg});
  }

  componentDidMount() {
    // debugger
    this.props
      .fetchTrailReviews(this.props.currentTrail._id)
      // .then(() => (this.setState({loaded: true})));
      .then(() => { 
        this.setState({ loaded: true }); 
        this.calcAvgRating();
      });    
  }


  reviewsList() {
    // console.log(this.props.reviews)
    if (Object.keys(this.props.reviews).length < 1) {
      return(
        <div>No reviews yet</div>
      )
    } else {
      // return(<div>You got some Reviews</div>)
      return (
        <div>
          AVERAGE RATING
          <br />
          <br />
          <StarRatings
            // rating={this.state.rating || 5}
            rating={this.state.avg_rating}
            changeRating={this.changeRating}
            starDimension="20px"
            starSpacing="1px"
            starRatedColor="yellow"
          />
          <br/>
          <br/>
          ALL RATINGS
          <br />
          <br />
          {this.props.reviews.map(review => (
            <div>
              <StarRatings
                // rating={this.state.rating || 5}
                rating={review.rating}
                changeRating={this.changeRating}
                starDimension="20px"
                starSpacing="1px"
                starRatedColor="yellow"
              />
              <br />
              {review.text}
              <br />
              {/* {review.rating} */}
              {review.date.split("T").shift()}
              <br />
              {review.user.email}
              <br />
            </div>
          ))}
        </div>
      );
    }
  }

  render() {
    if(!this.state.loaded){
      return(
        <div>not loaded</div>
      );
    }
    //  console.log(this.props)
    return (
      <div className="reviews-container">
        <h2 className='reviews-container-review'>
          Reviews for {this.props.currentTrail.title}
        </h2>
        {this.reviewsList()}
        <NewReviewForm />
      </div>
    );
  }
}

export default ReviewIndex;
