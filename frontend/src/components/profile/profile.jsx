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
       const userTrails = this.props.trails.length ? (
            this.props.trails.map((trail, i) => (
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
                    <div className='profile-desc-container'>
                        <div className="user-trail-title">{trail.title}</div>
                        {/* <br/> */}
                        <div className="user-trail-description">{trail.description}</div>
                        <button className='delete-trail-button' onClick={() => this.props.removeTrail(trail._id)}>Delete Trail</button>
                    </div>
                </div>
            ))
        ) : (
            <h1>You haven't made any trails yet!</h1>
        )

        return (
            <div className="user-trails">
                <div className="user-trails-list">
                    {userTrails}
                </div>
            </div>        
        );
    }
}

export default Profile;