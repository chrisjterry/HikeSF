import React from "react";
import { withRouter } from "react-router-dom";
import '../../stylesheets/new_trail_form.css'

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

    handleSubmit(e) {
        // debugger
        e.preventDefault();
        
        let trail = {
            title: this.state.title,
            description: this.state.description,
            difficulty: this.state.difficulty,
            petFriendly: this.state.petFriendly,
            paved: this.state.paved,
            // lat: this.state.lat,
            // lng: this.state.lng,
            lat: 3,
            lng: 1,
            user: this.props.currentUser,
            date: this.state.date
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
            <div className='new-trail-container'>
                <form onSubmit={this.handleSubmit}>
                    <div className="new-trail-form">
                        <div classaName='trail-form-wrapper'>
                            <div className='trail-title'>
                                <input className='trail-title-text' type="text" value={this.state.title} onChange={this.update("title")} placeholder="Title"/>
                            </div>
                            <div className='trail-description'>
                                <input className='trail-description-text' type="text" value={this.state.description} onChange={this.update("description")} placeholder="Description"/>
                            </div>
                            <div className='trail-difficulity'>
                                <input className='trail-difficulity-text' type="difficulty" value={this.state.difficulty} onChange={this.update("difficulty")} placeholder="Difficulty"/>
                            </div>
                            <div className='bottom-container'>
                                <div className='trail-pet-friendly'>
                                    <label className='pet-friendly'> Pet friendly? 
                                        {/* <input type="checkbox" value={this.state.petFriendly} /> */}
                                        <input className='pet-friendly' type="checkbox" value={this.state.petFriendly} onClick={this.togglePet.bind(this)} checked={this.state.petFriendly} />
                                    </label>
                                </div>
                                <div className='trail-paved'>
                                    <label className='paved-trail'> Paved?
                                        {/* <input type="checkbox" value={this.state.paved} /> */}
                                        <input className='trail-paved-text' type="checkbox" value={this.state.paved} onClick={this.togglePaved.bind(this)} checked={this.state.paved} />
                                    </label>
                                </div>
                            </div>    
                            <div className='trail-submit'>
                                <input className='trail-submit-button' type="submit" value="Create New Trail"/>
                                {this.renderErrors()}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(NewTrailForm);
// export default NewTrailForm;
