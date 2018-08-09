import React from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps';
import {AroundMarker} from "./AroundMarker"
import {POS_KEY} from "../constants"

class AroundMap extends React.Component {
  reloadMarkers = () => {
    const center = this.map.getCenter();
    const location = {lat: center.lat(), lon: center.lng()};
    const range = this.getRange();
    this.props.loadNearByPosts(location, range);
  }

  getRange = () => {
    const google = window.google;
    const center = this.map.getCenter();
    const bounds = this.map.getBounds();
    if (center && bounds) {
      const ne = bounds.getNorthEast();
      const right = new google.maps.LatLng(center.lat(), ne.lng());
      return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
    }
  }

  getMapRef = (map) => {
    this.map = map;
  }
  render(){
    const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
    return (
      <GoogleMap
        ref={this.getMapRef}
        onDragEnd={this.reloadMarkers}
        onZoomChanged={this.reloadMarkers}
        defaultZoom={8}
        defaultCenter={{ lat: lat,  lng: lon}}
      >
        {this.props.posts.map((post) => <AroundMarker key={post.url} post={post}/>)}
      </GoogleMap>
    );
  }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
//They are all functions. Calling these functions will return a enhanced component.