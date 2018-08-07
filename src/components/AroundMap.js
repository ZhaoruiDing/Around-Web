import React from 'react';
import {GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs} from 'react-google-maps';


class AroundMap extends React.Component {

  render(){
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        <Marker
          position={{ lat: -34.397, lng: 150.644 }}
        />
      </GoogleMap>
    );
  }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
//They are all functions. Calling these functions will return a enhanced component.