import React from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps';
import {AroundMarker} from "./AroundMarker"


class AroundMap extends React.Component {


  render(){
    const locations = [
      {lat: -34.397, lng: 150.144},
      {lat: -34.297, lng: 150.244},
      {lat: -34.197, lng: 150.344}
    ]
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        {locations.map((loc)=>
          <AroundMarker location={loc}/>
        )}
      </GoogleMap>
    );
  }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
//They are all functions. Calling these functions will return a enhanced component.