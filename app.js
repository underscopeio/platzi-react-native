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

import Icon from 'react-native-vector-icons/Ionicons'

export default class PlatziMusic extends Component {
  render() {
    const image = 'https://lastfm-img2.akamaized.net/i/u/300x300/31a51f6e3ec647c8997150ec837891c7.png'
    const name = 'David Bowie'
    const likes = 200
    const comments = 115

    return (
      <View style={styles.container}>
        <View style={styles.artistBox}>
          <Image style={styles.image} source={{ uri: image }} />

          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>

            <View style={styles.centeredRow}>
              <View style={styles.iconContainer}>
                <Icon name="ios-heart-outline" size={32} color="gray" />
                <Text style={styles.iconText}>{likes}</Text>
              </View>

              <View style={styles.iconContainer}>
                <Icon name="ios-chatboxes-outline" size={32} color="gray" />
                <Text style={styles.iconText}>{comments}</Text>
              </View>
            </View>
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
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  centeredRow: {
    flexDirection: 'row',
    marginHorizontal: 40,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconText: {
    color: 'gray',
  }
});

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
