import React from 'react';


class TrailIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTrails();
        window.scrollTo(0,0);
    }

    render() {
        return (
          <div>
            <h1>HEADER FOR TRAILS INDEX PAGE</h1>
            {this.props.trails.map((trail, i) => (
              <div className="trails-list">
                {/* hi Jeff we can render whatever you want about each trail here (see Trail.js for full list of Trail properties/ie table columns)! (full details can go in each trails show page)*/}
                {/* each trails number (starting at 1) */}
                <div>Trail #{i + 1}</div>
                {/* each trail's name */}
                <div>{trail.name}</div>
                {/* each trail's description */}
                <div>{trail.description}</div>
              </div>
            ))}
          </div>
        );
    }
}

export default TrailIndex;