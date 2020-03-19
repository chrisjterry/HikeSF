import React from 'react';
import { withRouter } from 'react-router-dom';
const google = window.google;
const marker = window.marker;

const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

const mapOptions = {
  center: {
    lat: 37.773972,
    lng: -122.431297
  },
  zoom: 13
};

class IndexMap extends React.Component {
  constructor(props) {
    super(props);
    this.markers = {};
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }
  
  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.registerListeners();

    this.props.trails.forEach( trail => {
      const position = new google.maps.LatLng(trail.lat, trail.lng);
      const marker = new google.maps.Marker({
        position,
        map: this.map,
        trailId: trail._id
      });
      marker.addListener('click', () => this.handleMarkerClick(trail));
      this.markers[marker.trailId] = marker;
    });
  }
  

  componentDidUpdate() {
    const trailsObj = {};
    this.props.trails.forEach(trail => trailsObj[trail._id] = trail);
    
    this.props.trails.forEach(trail => {
      if (!this.markers[trail._id]) {
        const position = new google.maps.LatLng(trail.lat, trail.lng);
        const marker = new google.maps.Marker({
          position,
          map: this.map,
          trailId: trail._id
        });
        marker.addListener('click', () => this.handleMarkerClick(trail));
        this.markers[marker.trailId] = marker;
      }
    });
    
    Object.keys(this.markers).forEach(trailId => {
      if (!trailsObj[trailId]) {
        this.markers[trailId].setMap(null);
        delete this.markers[trailId];  
      }
    });
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = { north, south, east, west }
      this.props.fetchTrails(bounds);
    });
    google.maps.event.addListener(this.map, 'click', (event) => {
      const coords = getCoordsObj(event.latLng);
      this.handleClick(coords);
    });
  }

  handleMarkerClick(trail) {
    this.props.history.push(`trails/${trail._id}`);
  }

  handleClick(coords) {
    this.props.history.push({
      pathname: 'trails/new',
      search: `lat=${coords.lat}&lng=${coords.lng}`
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

export default withRouter(IndexMap);
