import React from 'react';
import { withRouter } from 'react-router-dom';
const google = window.google;

class NewMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: parseFloat(this.props.lat),
      lng: parseFloat(this.props.lng),
      origin: new google.maps.LatLng(parseFloat(this.props.lat), parseFloat(this.props.lng)),
      waypoints: JSON.parse(this.props.waypoints)
        .map(waypoint => JSON.parse(waypoint))
        .map(waypoint => new google.maps.LatLng(parseFloat(waypoint.lat), parseFloat(waypoint.lng)))
    }
  }
  
  componentDidMount() {
    const map = this.refs.map;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    const mapOptions = {
      center: {
        lat: this.state.lat,
        lng: this.state.lng
      },
      zoom: 16
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.directionsRenderer.setMap(map);
    this.directionsService.route({
      origin: this.state.origin,
      destination: this.state.waypoints[this.state.waypoints.length - 1],
      waypoints: this.state.waypoints,
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response)
      } else {
        window.alert('Directions request failed due to ' + status);
      }
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
