import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
} from 'react-native';

import {
  Scene,
  Router
} from 'react-native-router-flux';

import HomeView from './HomeView'
import ArtistDetailView from './ArtistDetailView'

class PlatziMusic extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="home" component={HomeView}/>
          <Scene key="artistDetail" component={ArtistDetailView}/>
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
