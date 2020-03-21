import React from "react";
// import Stars from './stars_container';
import StarRatings from "react-star-ratings";
import { withRouter } from "react-router-dom";
import '../../stylesheets/review_form_container.css'

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
    // debugger;
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

    renderErrors() {
      if (Object.values(this.props.errors).length) {
        return (
          <ul>
            {Object.values(this.props.errors).map((error, i) => (
              <li key={`error-${i}`}>
                {i + 1}. {error}
              </li>
            ))}
          </ul>
        );
      } else {
        return null;
      }
    }

  render() {
    return (
      <div className='review-form-container-wrapper'>
        <div className='review-form-container'>
          <form onSubmit={this.handleSubmit}>
            <div className='review-form-text'>
              <br />
              <input
                className='review-form-text-input'
                type="textarea"
                value={this.state.text}
                onChange={this.update("text")}
                placeholder="Tell us about this trail!"
              />
              <br />
              <div className='review-rating'> 
                <StarRatings
                  className='review-form-rating'
                  rating={this.state.rating || 5}
                  changeRating={this.changeRating}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor="green"
                  name="rating"
                />
              </div>
              <br />
              <div className='review-form-submit'>
                <input className='review-form-submit-button' type="submit" value="Create Review" />
              </div>
              {this.renderErrors()}
              </div>
            </form>
        </div>
      </div>
    );
  }
}

export default withRouter(NewReviewForm);
