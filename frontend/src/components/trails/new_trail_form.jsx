import React from "react";
import { withRouter } from "react-router-dom";
import NewMap from '../map/new_map';
import '../../stylesheets/new_trail_form.css';

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
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>{i+1}. {error}</li>
                ))}
            </ul>
        );
    }

    render() {
        // debugger
        return (
          <div>
            <div className="new-trail-form">
              <form onSubmit={this.handleSubmit}>
                {/* <div className="trail-form-wrapper"> */}
                <div className="top-form">
                  <div className="top-form-header">
                    <h1>Create New Trail</h1>
                    <br />
                    <br />
                    <div>
                      1. Select the path by clicking on the map to place markers
                      ➤
                    </div>

                    <br />
                    <div>2. Fill in trail details below</div>
                    {/* <div className="details"> */}
                    <br />
                    <div className="trail-title">
                      <input
                        className="trail-title-text"
                        type="text"
                        value={this.state.title}
                        onChange={this.update("title")}
                        placeholder="...trail title"
                      />
                    </div>
                    <div className="trail-description">
                      <input
                        className="trail-description-text"
                        type="textarea"
                        value={this.state.description}
                        onChange={this.update("description")}
                        placeholder="...trail description"
                      />
                    </div>
                    <br />
                    <br />
                    <div className="dropdown">
                      <button type="button" className="dropbtn">
                        Difficulty Level ☰
                      </button>
                      <div className="dropdown-content">
                        <label>
                          <input
                            type="radio"
                            value="easy"
                            onChange={this.update("difficulty")}
                          />{" "}
                          easy
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="moderate"
                            onChange={this.update("difficulty")}
                          />{" "}
                          moderate
                        </label>

                        <label>
                          <input
                            type="radio"
                            value="hard"
                            onChange={this.update("difficulty")}
                          />{" "}
                          hard
                        </label>
                      </div>
                      {/* <input className='trail-difficulity-text' type="difficulty" value={this.state.difficulty} onChange={this.update("difficulty")} placeholder="Difficulty"/> */}
                    </div>
                    <br />
                    <div className="trail-pet-friendly">
                      <label className="pet-friendly">
                        Pet friendly?
                        {/* <input type="checkbox" value={this.state.petFriendly} /> */}
                        <input
                          className="pet-friendly"
                          type="checkbox"
                          value={this.state.petFriendly}
                          onClick={this.togglePet.bind(this)}
                          checked={this.state.petFriendly}
                        />
                      </label>
                    </div>
                    <br />
                    <div className="trail-paved">
                      <label className="paved-trail">
                        Paved?
                        {/* <input type="checkbox" value={this.state.paved} /> */}
                        <input
                          className="trail-paved-text"
                          type="checkbox"
                          value={this.state.paved}
                          onClick={this.togglePaved.bind(this)}
                          checked={this.state.paved}
                        />
                      </label>
                    </div>
                    <br />
                    <div className="input-file">
                      <input
                        className="file-input"
                        onChange={this.handleFile}
                        id="photo-upload"
                        type="file"
                      />
                      {/* {this.state.picture_url ? (
                        <img src={this.state.picture_url} />
                      ) : null} */}
                    </div>
                    <br />
                    <div className="trail-submit">
                      <input
                        className="trail-submit-button"
                        type="submit"
                        value="create!"
                      />
                      {this.renderErrors()}
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="right-create">
                    <NewMap
                      lat={this.state.lat}
                      lng={this.state.lng}
                      addWaypoint={this.addWaypoint}
                      className="new-trail-map"
                    />
                    {this.state.picture_url ? (
                      <img src={this.state.picture_url} className="uploaded"/>
                    ) : null}
                  </div>
                </div>

                {/* </div> */}
              </form>
            </div>
          </div>
        );
    }
}

export default withRouter(NewTrailForm);
// export default NewTrailForm;
