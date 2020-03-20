import React from 'react';
import { withRouter } from 'react-router-dom';
const google = window.google;

class ShowMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: parseFloat(this.props.lat),
      lng: parseFloat(this.props.lng),
      origin: new google.maps.LatLng(parseFloat(this.props.lat), parseFloat(this.props.lng)),
      waypoints: JSON.parse(this.props.waypoints)
        .map(waypoint => JSON.parse(waypoint))
        .map(waypoint => ({ location: { lat: parseFloat(waypoint.lat), lng: parseFloat(waypoint.lng)}}))
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
      zoom: 15
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.directionsRenderer.setMap(this.map);
    this.directionsRenderer.setOptions({ preserveViewport: true });
    this.directionsService.route({
      origin: this.state.origin,
      destination: this.state.waypoints[this.state.waypoints.length - 1],
      waypoints: this.state.waypoints.slice(0, this.state.waypoints.length - 1),
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

export default withRouter(ShowMap);
