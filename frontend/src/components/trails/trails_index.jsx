import React from 'react';
import { Link } from "react-router-dom";
import IndexMap from "../map/TEST_map_container";
import Tucker1 from "./tucker1.png";
import '../../stylesheets/trails_index.css'
import gray from "./gray.jpg";


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
            <div className="index-map">
              Navigate around the map to find your next adventure!
              <br />
              <br />
              <IndexMap
                trails={this.props.trails}
                fetchTrails={this.props.fetchTrails}
              />
            </div>
            {/* <img className="main-page-picture" src={gray} alt="" /> */}

            <div className="trails-index">
              <div className="trails-list">
                {this.props.trails.map((trail, i) => (
                  <div className="trails-list-internal">
                    <div>
                      <Link to={`/trails/${trail._id}`}>
                        <img src={Tucker1} height="100px" width="100px"></img>
                      </Link>
                    </div>
                    <div className="trail-text">
                      <div className="trail-title">{trail.title}</div>
                      <div>{trail.description}</div>
                      {/* <div className='trails-index-rating'>Rating - ★★★★★</div> */}
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="index-map">
                Navigate around the map to find your next adventure!
                <br />
                <br />
                <IndexMap
                  trails={this.props.trails}
                  fetchTrails={this.props.fetchTrails}
                />
              </div> */}
            </div>
          </div>
        );
    }
}

export default TrailIndex;