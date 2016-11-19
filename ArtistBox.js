import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

export default class ArtistBox extends Component {
  render() {
    const { image, name, likes, comments } = this.props.artist

    return (
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
    );
  }
}

const styles = StyleSheet.create({
  artistBox: {
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: -2,
    },
    shadowRadius: 1,
    shadowOpacity: .5,
    marginHorizontal: 8,
    marginBottom: 8,
    elevation: 2,
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
    color: '#333'
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
