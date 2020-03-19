import React from "react";
// import Stars from './stars_container';
import StarRatings from "react-star-ratings";
import { withRouter } from "react-router-dom";

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      rating: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
      this.changeRating = this.changeRating.bind(this);
    // this.handleCheckBox = this.handleCheckBox.bind(this);
    // this.clearedErrors = false;
  }

  //   componentWillReceiveProps(nextProps) {
  //     this.setState({ errors: nextProps.errors });
  //     this.setState({newTrail: nextProps.newTrail.title});
  //   }

  changeRating(newRating, name) {
    this.setState({
      [name]: newRating
    });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger;
    let review = {
      text: this.state.text,
      rating: this.state.rating.toString(),
      user: this.props.currentUser,
      trail: this.props.currentTrail,
      date: this.state.date
      // date: ''
    };

    this.props.createReview(review);
  }

  //   renderErrors() {
  //     return (
  //       <ul>
  //         {Object.keys(this.state.errors).map((error, i) => (
  //           <li key={`error-${i}`}>
  //             {i + 1}. {error}
  //           </li>
  //         ))}
  //       </ul>
  //     );
  //   }

  render() {
    // debugger
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <br />
            <input
              type="textarea"
              value={this.state.text}
              onChange={this.update("text")}
              placeholder="Tell us about this trail!"
            />
            <br />
            {/* note to vic: turn into stars */}
            {/* <input
              type="rating"
              value={this.state.rating}
              onChange={this.update("rating")}
              placeholder="rating"
            />
            <br /> */}
            {/* <Stars /> */}
            <StarRatings
              rating={this.state.rating || 5}
              changeRating={this.changeRating}
              starDimension="20px"
              starSpacing="1px"
              starRatedColor="green"
              name="rating"
            />
            <br />
            <input type="submit" value="Create Review" />
            {/* {this.renderErrors()} */}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(NewReviewForm);
