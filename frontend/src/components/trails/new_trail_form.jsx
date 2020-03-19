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
            lat: this.props.lat,
            lng: this.props.lng,
            errors: {},
            picture_url: null,
            picture: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
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
            user: this.props.currentUser,
            date: this.state.date,
            picture: this.state.picture
        };
        const formData = new FormData();
        Object.keys(trail).forEach( key => {
            if (trail[key]) formData.append(`${key}`, trail[key])
        });
        this.props.createTrail(formData);
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
                <div className="new-trail-form">
                    <form onSubmit={this.handleSubmit}>
                        <div classaName='trail-form-wrapper'>
                            <div className='create-trail'>
                                Create New Trail
                            </div>
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
                            <div className='input-file'>
                                <input className='file-input' onChange={this.handleFile} id='photo-upload' type="file"/>
                                { this.state.picture_url ? <img src={this.state.picture_url} /> : null } 
                            </div>   
                            <div className='trail-submit'>
                                <input className='trail-submit-button' type="submit" value="Create New Trail"/>
                                {this.renderErrors()}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(NewTrailForm);
// export default NewTrailForm;
