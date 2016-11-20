/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
} from 'react-native';

import ArtistList from './ArtistList'
import { artistList } from './artists-data'

export default class PlatziMusic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ArtistList artists={artistList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 20,
  },
});

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
