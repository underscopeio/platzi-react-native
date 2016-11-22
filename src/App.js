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

import LoginView from './LoginView'
import HomeView from './HomeView'
import ArtistDetailView from './ArtistDetailView'

class PlatziMusic extends React.Component {
  render() {
    return (
      <Router>        
        <Scene key="login" component={LoginView} hideNavBar />
        <Scene key="root" hideNavBar type="replace">
          <Scene key="home" component={HomeView} />
          <Scene key="artistDetail" component={ArtistDetailView} />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
