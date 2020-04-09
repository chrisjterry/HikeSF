import React from 'react';
import { Link } from "react-router-dom"
import "../../stylesheets/profile.css";


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
                <h1>All created trails</h1>
                <div className="user-trails-list">
                  {this.props.trails.map((trail, i) => (
                    <div>
                      <div className="user-trails-each">
                        <Link to={`/trails/${trail._id}`}>
                          <img
                            src={trail.picture_url}
                            height="300px"
                            width="300px"
                            className="user-trail-image"
                          />
                        </Link>
                        <div className="user-trail-words">
                            <div className="user-trail-desc">{trail.title}</div>
                            <div>{trail.description}</div>
                            <button
                            className="delete-trail-button"
                            onClick={() => this.props.removeTrail(trail._id)}
                            >
                            DELETE
                            </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
        }
    }
}

export default Profile;