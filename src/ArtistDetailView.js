import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import ArtistBox from './ArtistBox'

export default class ArtistDetailView extends Component {
  handleBackButtonPress() {
    Actions.pop()
  }

  render() {
    const { artist } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.handleBackButtonPress}>
            <View style={styles.backButton}>
              <Icon name="ios-arrow-round-back" size={32} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>{artist.name}</Text>
          <Image style={styles.image} source={{ uri: artist.image }} />
        </View>
        <ArtistBox artist={artist} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  header: {
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
    paddingTop: 10,
    width: 40,
    marginRight: 5,
  },
  image: {
    marginRight: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCC8'
  }
});
