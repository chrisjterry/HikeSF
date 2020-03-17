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
                trails index page
            </div>
        )
    }
}

export default TrailIndex;