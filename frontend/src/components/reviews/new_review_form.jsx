import React from "react";
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
    // this.handleCheckBox = this.handleCheckBox.bind(this);
    // this.clearedErrors = false;
  }

//   componentWillReceiveProps(nextProps) {
//     this.setState({ errors: nextProps.errors });
//     this.setState({newTrail: nextProps.newTrail.title});
//   }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger
    let review = {
      text: this.state.text,
      rating: this.state.rating,
      user: this.props.currentUser,
      trail: this.props.currentTrail,
      date: this.state.date
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
      <div className='review-form-container-wrapper'>
        <div className='review-form-container'>
          <form onSubmit={this.handleSubmit}>
            <div className='review-form-text'>
              <input className='review-form-text-input' type="text" value={this.state.text} onChange={this.update("text")} placeholder="Review text goes here"/>
            </div>
            {/* note to vic: turn into stars */}
            <div className='review-rating'>
              <input className='review-form-rating' type="rating" value={this.state.rating} onChange={this.update("rating")} placeholder="Rating"/>
            </div>
            <div className='review-form-submit'>
              <input className='review-submit-button' type="submit" value="Create New Review" />
            </div>
            {/* {this.renderErrors()} */}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(NewReviewForm);
