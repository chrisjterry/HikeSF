import React from 'react';
import { Link } from "react-router-dom";
import IndexMap from "../map/TEST_map_container";
import Tucker1 from "./tucker1.png";
import '../../stylesheets/trails_index.css'

class TrailIndex extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.fetchTrails();
        window.scrollTo(0,0);
    }

    render() {
        // debugger
        return (
          <div className='trails-index-container'>
            <div className='trails-header'>
              <h1 className='trails-header-text'>HEADER FOR TRAILS INDEX PAGE</h1>
            </div>
            <div className='trails-index-map-container'>
              <IndexMap
                trails={this.props.trails}
                fetchTrails={this.props.fetchTrails}
              />
            </div>
            <div className='trails-map'>
            {this.props.trails.map((trail, i) => (
              <div className="trails-list">
                <div className='left-side-container'>
                  <Link to={`/trails/${trail._id}`}>
                    <img src={Tucker1} height="100px" width="100px"></img>
                  </Link>
                </div>
                <div className='right-side-container'>
                  <div className='trails-index-title'>Title - {trail.title}</div>
                  <div className='trails-index-description'>Description - {trail.description}</div>
                  {/* <div className='trails-index-rating'>Rating - ★★★★★</div> */}
                </div>
              </div>
            ))}
            </div>
          </div>
        );
    }
}

export default TrailIndex;