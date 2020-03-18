import React from "react";
import { withRouter } from "react-router-dom";

class NewTrailForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            difficulty: "",
            petFriendly: true,
            paved: true,
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleCheckBox = this.handleCheckBox.bind(this);
        this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors });
        // this.setState({newTrail: nextProps.newTrail.title});
    }

    update(field) {
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

    handleSubmit(e) {
        // debugger
        e.preventDefault();
        
        let trail = {
            title: this.state.title,
            desciption: this.state.desciption,
            difficulty: this.state.difficulty,
            petFriendly: this.state.petFriendly,
            paved: this.state.paved,
            // lat: this.state.lat,
            // lng: this.state.lng,
            user: this.props.currentUser,
            // date: this.state.date
        };

        this.props.createTrail(trail);
        // this.setState({title: ''})
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
                <form onSubmit={this.handleSubmit}>
                    <div className="new-trail-form">
                        <br />
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={this.update("title")}
                            placeholder="Title"
                        />
                        <br />
                        <input
                            type="text"
                            value={this.state.description}
                            onChange={this.update("description")}
                            placeholder="Description"
                        />
                        <br />
                        <input
                            type="difficulty"
                            value={this.state.difficulty}
                            onChange={this.update("difficulty")}
                            placeholder="Difficulty"
                        />
                        <br />
                        <label> Pet friendly? 
                            {/* <input type="checkbox" value={this.state.petFriendly} /> */}
                            <input type="checkbox" value={this.state.petFriendly} onClick={this.togglePet.bind(this)} checked={this.state.petFriendly} />
                        </label>
                        <br />
                        <label> Paved?
                            {/* <input type="checkbox" value={this.state.paved} /> */}
                            <input type="checkbox" value={this.state.paved} onClick={this.togglePaved.bind(this)} checked={this.state.paved} />
                        </label>
                        <br />
                        <input type="submit" value="Create New Trail"/>
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(NewTrailForm);
// export default NewTrailForm;
