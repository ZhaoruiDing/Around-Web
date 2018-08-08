import React from 'react';
import {Marker, InfoWindow} from 'react-google-maps';
export class AroundMarker extends React.Component{
  state = {
    isOpen: false,
  }

  onToggleOpen = () => {
    this.setState((prevState)=>{
      return {
        isOpen: !prevState.isOpen,
      }
    });
  }

  render(){
    const {location} = this.props;
    return (
      <Marker
        position={location}
        onClick={this.onToggleOpen}
      >
        {this.state.isOpen ?
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <div>
              content
            </div>
          </InfoWindow> : null}

      </Marker>
    );
  }


}