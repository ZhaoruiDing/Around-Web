import React from 'react';
import { Tabs, Button } from 'antd';
import {GEO_LOCATION} from "../constants"


const TabPane = Tabs.TabPane;
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
    const operations = <Button type="primary">Create New Post</Button>;
    return (
      <div className="main-tabs">
        <Tabs tabBarExtraContent={operations}>
          <TabPane tab="Posts" key="1">Content of tab 1</TabPane>
          <TabPane tab="Map" key="2">Content of tab 2</TabPane>

        </Tabs>
      </div>
    )

  }
}