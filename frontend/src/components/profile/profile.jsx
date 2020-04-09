import React from 'react';
import { Link } from "react-router-dom"
import '../../stylesheets/profile.css'

class Profile extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         trails: []
    //     }
    // }

    componentDidMount() {
        this.props.fetchUserTrails(this.props.currentUser.id);
        window.scrollTo(0,0);
    }

    // componentWillReceiveProps(newState) {
    //     this.setState({ trails: newState.trails })
    // }

    render() {
        if(this.props.trails.length === 0) {
            return (<div>No trails created yet</div>)
        } else {
            return (
                <div className="user-trails">
                    <div className="user-trails-list">
                        {this.props.trails.map((trail, i) => (
                            <div className="user-trails-internal">
                                <div className='user-trails-internal-child'>
                                    <Link to={`/trails/${trail._id}`}>
                                        <img className='profile-pic'
                                            src={trail.picture_url}
                                            height="300px" 
                                            width="300px"
                                            className="user-trail-image"
                                        />
                                    </Link>
                                </div>

                                <div className="user-trail-title">{trail.title}</div>
                                <div className="user-trail-description">{trail.description}</div>
                                <button className='delete-trail-button' onClick={() => this.props.removeTrail(trail._id)}>Delete Trail</button>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
}

export default Profile;