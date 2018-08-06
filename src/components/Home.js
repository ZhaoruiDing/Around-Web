import React from 'react';
import {GEO_LOCATION} from "../constants"

export class Home extends React.Component {
  componentDidMount(){
    this.getGeolocation();
  }

  getGeolocation = ()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.onSuccessLoadGeoLocation,
        this.onFailedLoadGeoLocation,
        GEO_LOCATION,
      );
    } else {
      /* geolocation IS NOT available */
    }
  }


  onSuccessLoadGeoLocation= (position) => {
    console.log(position);
  }

  onFailedLoadGeoLocation = (error) => {
    console.log(error);

  }

  render() {
    return (
      <div>
        This is home
      </div>
    )

  }
}