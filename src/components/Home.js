import React from 'react';
import { Tabs, Button } from 'antd';
import {GEO_LOCATION} from "../constants"


const TabPane = Tabs.TabPane;
export class Home extends React.Component {
  state = {
    loadingGeoLocation: false,
  }
  componentDidMount(){
    this.setState({loadingGeoLocation: true });
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
    this.setState({loadingGeoLocation: false });
    console.log(position);
  }

  onFailedLoadGeoLocation = (error) => {
    this.setState({loadingGeoLocation: false });
    console.log(error);

  }

  render() {
    const operations = <Button type="primary">Create New Post</Button>;
    return (
      <div className="main-tabs">
        <Tabs tabBarExtraContent={operations}>
          <TabPane tab="Posts" key="1">{this.state.loadingGeoLocation? "loading geolocation" : ""}</TabPane>
          <TabPane tab="Map" key="2">Content of tab 2</TabPane>

        </Tabs>
      </div>
    )

  }
}