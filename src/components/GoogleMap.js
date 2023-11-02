import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      places: [],
    };
  }

  componentDidMount() {
    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({ userLocation: { lat: latitude, lng: longitude } });
    });
  }

  onMapReady = (mapProps, map) => {
    this.setState({ map });
    // Use the Places API to search for Halal food restaurants and mosques
    const { google } = this.props;
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location: this.state.userLocation,
        radius: 1000, // Adjust the radius as needed
        type: ['restaurant', 'mosque'],
        keyword: 'halal',
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState({ places: results });
        }
      }
    );
  };

  render() {
    const { places, userLocation } = this.state;

    return (
      <div>
        <Map
          google={this.props.google}
          onReady={this.onMapReady}
          center={userLocation}
          zoom={15}
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              name={place.name}
              position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_API_KEY_HERE',
})(MapContainer);
