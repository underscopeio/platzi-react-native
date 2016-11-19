/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class PlatziMusic extends Component {
  render() {
    const image = 'https://lastfm-img2.akamaized.net/i/u/300x300/31a51f6e3ec647c8997150ec837891c7.png'
    const name = 'David Bowie'

    return (
      <View style={styles.container}>
        <View style={styles.artistBox}>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
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
  artistBox: {
    margin: 5,
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
