import React from 'react';
import { Link } from "react-router-dom";
import IndexMap from "../map/TEST_map_container";
import Tucker1 from "./tucker1.png";

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
          <div>
            <h1>HEADER FOR TRAILS INDEX PAGE</h1>
            {/* <IndexMap
              trails={this.props.trails}
              fetchTrails={this.props.fetchTrails}
            /> */}
            {this.props.trails.map((trail, i) => (
              <div className="trails-list">
                {/* <div>Trail #{i + 1}</div> */}
                <Link to={`/trails/${trail._id}`}>
                  <img src={Tucker1} height="100px" width="100px"></img>
                </Link>
                <div>Title - {trail.title}</div>
                <div>Description - {trail.description}</div>
                <div>Rating - ★★★★★</div>
              </div>
            ))}
          </div>
        );
    }
}

export default TrailIndex;