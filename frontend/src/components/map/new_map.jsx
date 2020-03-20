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
      lat: parseFloat(this.props.lat),
      lng: parseFloat(this.props.lng)
    }
  }
  
  componentDidMount() {
    const map = this.refs.map;
    const mapOptions = {
      center: {
        lat: this.state.lat,
        lng: this.state.lng
      },
      zoom: 16
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.registerListeners();
    const position = new google.maps.LatLng(this.state.lat, this.state.lng);
    const marker = new google.maps.Marker({
      position,
      map: this.map,
    });
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
      <div className="map" ref="map">
        Map
      </div>
    );
  }
}

export default withRouter(NewMap);
