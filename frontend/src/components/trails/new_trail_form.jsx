import React from "react";
import { withRouter } from "react-router-dom";
import NewMap from '../map/new_map';
import '../../stylesheets/new_trail_form.css';
import imagehere from './imagehere.png'

class NewTrailForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            difficulty: "",
            petFriendly: true,
            paved: true,
            lat: this.props.lat,
            lng: this.props.lng,
            waypoints: [],
            errors: {},
            picture_url: null,
            picture: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.addWaypoint = this.addWaypoint.bind(this)
        // this.handleCheckBox = this.handleCheckBox.bind(this);
        this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors });
        // this.setState({newTrail: nextProps.newTrail.title});
    }

    addWaypoint(waypoint) {
        if (!this.state.lat || !this.state.lng) {
            this.setState({ lat: waypoint.lat, lng: waypoint.lng })
        } else {
            let _waypoints = this.state.waypoints.slice();
            _waypoints.push(JSON.stringify(waypoint));
            this.setState({ waypoints: _waypoints });
        }
    }

    update(field) {
        // debugger
        return e =>
            this.setState({
                [field]: e.currentTarget.value
            });
    }

    // handleCheckBox(e) {
    //     this.setState({
    //         petFriendly: e.target.petFriendly,
    //         paved: e.target.paved
    //     })
    // }

    togglePet(e) {
        this.setState({ petFriendly: !this.state.petFriendly });
    }
    togglePaved(e) {
        this.setState({ paved: !this.state.paved });
    }

    handleFile(e) {
        e.preventDefault();
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
            this.setState({picture: file, picture_url: fileReader.result});
        };

        if (file) fileReader.readAsDataURL(file);
    }

    handleSubmit(e) {
        e.preventDefault();
        const trail = {
            title: this.state.title,
            description: this.state.description,
            difficulty: this.state.difficulty,
            petFriendly: this.state.petFriendly.toString(),
            paved: this.state.paved.toString(),
            lat: this.state.lat,
            lng: this.state.lng,
            waypoints: JSON.stringify(this.state.waypoints),
            user: this.props.currentUser,
            date: this.state.date,
            picture: this.state.picture
        };
        const formData = new FormData();
        Object.keys(trail).forEach( key => {
            if (trail[key]) formData.append(`${key}`, trail[key])
        });
        this.props.createTrail(formData)
        .then(() => {
              if (this.props.errors.length === 0)
                this.props.history.push(`/trails`);
            });
    }

    renderErrors() {
        return (
            <ul>
                {Object.values(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>{i+1}. {error}</li>
                ))}
            </ul>
        );
    }

    render() {
        // debugger
        return (
          <div className="new-trail">
            <form onSubmit={this.handleSubmit} className="new-trail-form">
              {/* <div className="trail-form-wrapper"> */}
              {/* <div className="top-form"> */}
              {/* <div className="top-form-header"> */}
              <h1>Create New Trail</h1>
              <br />
              <br />
              <div>
                1. SELECT THE PATH BY CLICKING ON THE TRAIL TO PLACE MARKERS ➤
              </div>
              <br />
              <div>2. FILL IN TRAIL DETAILS BELOW</div>
              <div>
                <br />
                <input
                  // className="trail-title-text"
                  className="create-title-text"
                  type="text"
                  value={this.state.title}
                  onChange={this.update("title")}
                  placeholder="...trail title"
                />
              </div>
              <br />
              <div>
                <textarea
                  rows="5"
                  cols="20"
                  name="descripttxt"
                  className="trail-description-text"
                  wrap="hard"
                  value={this.state.description}
                  onChange={this.update("description")}
                  placeholder="...trail description"
                ></textarea>
              </div>
              <br />
              <div className="little-buttons">
                <div>
                  <label className="checkbox-container radio-container">
                    <input
                      type="radio"
                      value="easy"
                      name="difficulty"
                      // checked
                      className="diff"
                      onChange={this.update("difficulty")}
                    />{" "}
                    <span className="checkmark checkmark-radio"></span>
                    Easy
                  </label>
                  <br />
                  <label className="checkbox-container radio-container">
                    <input
                      type="radio"
                      value="moderate"
                      name="difficulty"
                      onChange={this.update("difficulty")}
                    />{" "}
                    <span className="checkmark checkmark-radio"></span>
                    Moderate
                  </label>
                  <br />
                  <label className="checkbox-container radio-container">
                    <input
                      type="radio"
                      value="hard"
                      name="difficulty"
                      onChange={this.update("difficulty")}
                    />{" "}
                    <span className="checkmark checkmark-radio"></span>
                    Hard
                  </label>
                </div>
                <br />
                <div className="checkboxes">
                  <div>
                    <label className="checkbox-container">
                      {/* <input type="checkbox" value={this.state.petFriendly} /> */}
                      <input
                        type="checkbox"
                        value={this.state.petFriendly}
                        onClick={this.togglePet.bind(this)}
                        checked={this.state.petFriendly}
                      />
                      <span className="checkmark small-box"></span>
                      Pet friendly?
                    </label>
                  </div>
                  <br />
                  <div>
                    <label className="checkbox-container">
                      {/* <input type="checkbox" value={this.state.paved} /> */}
                      <input
                        type="checkbox"
                        value={this.state.paved}
                        onClick={this.togglePaved.bind(this)}
                        checked={this.state.paved}
                      />
                      <span className="checkmark small-box"></span>
                      Paved?
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <div>3. UPLOAD AN IMAGE</div>
              <br />
              <br />
              <div>
                <label className="input-label">
                  {" "}
                  Import Image
                  <input
                    className="file-input"
                    onChange={this.handleFile}
                    id="photo-upload"
                    type="file"
                  />
                </label>
                {/* {this.state.picture_url ? (
                        <img src={this.state.picture_url} />
                      ) : null} */}
              </div>
              <br />
              <br />
              <div className="trail-submit">
                <input
                  className="trail-submit-button"
                  type="submit"
                  value="Create!"
                />
                {this.renderErrors()}
              </div>
            </form>
            <div className="right-create">
              <div className="new-trail-map">
                <NewMap
                  lat={this.state.lat}
                  lng={this.state.lng}
                  addWaypoint={this.addWaypoint}
                />
              </div>
              <div>
                {this.state.picture_url ? (
                  <img src={this.state.picture_url} className="uploaded" />
                ) : (
                  <img src={imagehere} className="not-uploaded" />
                )}
              </div>
            </div>
          </div>
        );
    }
}

export default withRouter(NewTrailForm);
// export default NewTrailForm;
