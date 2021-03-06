import React from 'react';
import { Tabs, Spin } from 'antd';
import {GEO_LOCATION, POS_KEY, API_ROOT, TOKEN_KEY, AUTH_PREFIX} from "../constants";
import $ from 'jquery';
import { Gallery } from './Gallery';
import {CreatePostButton} from "./CreatePostButton";
import {WrappedAroundMap} from "./AroundMap"

const TabPane = Tabs.TabPane;
export class Home extends React.Component {
  state = {
    loadingGeoLocation: false,
    loadingPosts: false,
    error: '',
    posts: [],
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
      this.setState({ error: 'Your browser does not support geolocation!' });
    }
  }


  onSuccessLoadGeoLocation= (position) => {
    this.setState({loadingGeoLocation: false, error: '' });
    const {latitude, longitude} = position.coords;
    localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude}));
    this.loadNearByPosts();
    console.log(position);
  }

  onFailedLoadGeoLocation = () => {
    this.setState({ loadingGeoLocation: false, error: 'Failed to load geo location!' });
  }

  getGalleryPanelContent = () => {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    } else if (this.state.loadingGeoLocation) {
      return <Spin tip="Loading geo location..."/>;
    } else if (this.state.loadingPosts) {
      return <Spin tip="Loading posts..."/>;
    } else if (this.state.posts && this.state.posts.length > 0) {
      const images = this.state.posts.map((post) => {
        return {
          user: post.user,
          src: post.url,
          thumbnail: post.url,
          thumbnailWidth: 400,
          thumbnailHeight: 300,
          caption: post.message,
        }
      });
      return <Gallery images={images}/>;
    }
    else {
      return null;
    }
  }

  loadNearByPosts = (location, range)=>{
    this.setState({ loadingPosts: true, error: '' });
    const {lat, lon} = location? location : JSON.parse(localStorage.getItem(POS_KEY));
    const radius = range? range : 20;
    $.ajax({
      url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&${radius}`,
      method: 'GET',
      headers:{
        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
      },
    }).then((response)=>{
      this.setState({ posts: response || [], loadingPosts: false, error: '' });
      console.log(response);
    }, (error)=>{
      this.setState({ loadingPosts: false, error: error.responseText });
      console.log(error);
    }).catch((error)=>{
      console.log(error);
    });
  }
  render() {
    const operations = <CreatePostButton loadNearByPosts={this.loadNearByPosts}/>;
    return (
      <Tabs tabBarExtraContent={operations} className="main-tabs">
        <TabPane tab="Posts" key="1">
          {this.getGalleryPanelContent()}
        </TabPane>
        <TabPane tab="Map" key="2">
          <WrappedAroundMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbJuJjFb4nZd3TsMQuQtxZBWkzAYzH_3k&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `800px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            posts={this.state.posts || []}
            loadNearByPosts={this.loadNearByPosts}
          />
        </TabPane>
      </Tabs>
    );

  }
}


//React Element Tree ====> Component Render ====> diff (VDOM1, VDOM2) ====> React =====> DOM ====> browser