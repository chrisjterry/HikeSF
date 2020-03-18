import React from "react";
import { withRouter } from "react-router-dom";

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      rating: 0
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

    let review = {
      text: this.state.text,
      rating: 0,
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <br />
            <input
              type="text"
              value={this.state.text}
              onChange={this.update("text")}
              placeholder="Review text goes here"
            />
            <br />
            {/* note to vic: turn into stars */}
            <input
              type="rating"
              value={this.state.rating}
              onChange={this.update("rating")}
              placeholder="rating"
            />
            <br />
            <input type="submit" value="Create New Trail" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(NewTrailForm);
// export default NewTrailForm;
