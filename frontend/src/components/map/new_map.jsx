import React from 'react';
import { withRouter } from 'react-router-dom';
const google = window.google;
const marker = window.marker;

const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});


class NewMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: (this.props.lat ? parseFloat(this.props.lat) : null),
      lng: (this.props.lng ? parseFloat(this.props.lng) : null),
    }
  }
  
  componentDidMount() {
    const map = this.refs.map;
    const mapOptions = {
      center: {
        lat: (this.state.lat ? this.state.lat : 37.773972),
        lng: (this.state.lng ? this.state.lng : -122.431297)
      },
      zoom: (this.state.lat ? 16 : 13)
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.registerListeners();
    if (this.state.lat && this.state.lng) {
      const position = new google.maps.LatLng(this.state.lat, this.state.lng);
      const marker = new google.maps.Marker({
        position,
        map: this.map,
      });
    }
  }
  
  registerListeners() {
    google.maps.event.addListener(this.map, 'click', (event) => {
      const coords = getCoordsObj(event.latLng);
      const position = new google.maps.LatLng(coords.lat, coords.lng);
      const marker = new google.maps.Marker({
        position,
        map: this.map,
      });
      this.props.addWaypoint(coords);
    });
  }

  render() {
    return (
      <div className="create-trail-map" ref="map">
        Map
      </div>
    );
  }
}

export default withRouter(NewMap);
