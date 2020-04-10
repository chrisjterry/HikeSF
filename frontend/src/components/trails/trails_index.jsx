import React from "react";
import { Link } from "react-router-dom";
import IndexMap from "../map/TEST_map_container";
import Tucker1 from "./tucker1.png";
import '../../stylesheets/trails_index.css'
import graycut from "./graycut.png";


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

        const trailsList = this.props.trails.length ? (
          this.props.trails.map((trail, i) => (
            <div className="trails-list-internal">
              <div>
                <Link to={`/trails/${trail._id}`}>
                  <img
                    src={trail.picture_url}
                    height="300px"
                    width="300px"
                    className="index-img"
                  ></img>
                </Link>
              </div>
          
              {/* <div> */}
                <div className="index-trail-title">{trail.title}</div>
                <div className="index-trail-description">{trail.description}</div>
              {/* </div> */}
            </div>
          ))
        ) : (
          <h1>No trails here</h1>
        );

        return (
          <div className="trails-index">
            <div className="trails-index-1">
              <div>
                <p>Navigate around the map to find your next adventure.</p>
                <p>around the map to find your next adventure.</p>
              </div>
              {/* <div className="index-map"> */}
                <IndexMap
                  trails={this.props.trails}
                  fetchTrails={this.props.fetchTrails}
                />
              {/* </div> */}
              </div>
            <div className="trails-index-2">
              <div className="trails-list">
                {trailsList}
              </div>
            </div>                  
          </div>
        );
  }
}

export default TrailIndex;
