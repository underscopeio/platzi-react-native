import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import { firebaseAuth, firebaseDatabase } from './firebase'

export default class ArtistBox extends Component {

  state = {
    liked: null,
    likeCount: null,
  }

  componentWillMount() {
    this.getArtistRef().on('value', this.handleArtistOnValue)
  }

  componentWillUnmount() {
    this.getArtistRef().off('value', this.handleArtistOnValue)
  }

  handleArtistOnValue = snapshot => {
    const userId = firebaseAuth.currentUser.uid

    const artist = snapshot.val()

    if (!artist) {
      return this.getArtistRef().set({ likeCount: 0 })
    }

    const likeCount = artist.likeCount
    const liked = artist.likes && artist.likes[userId]

    this.setState({ liked, likeCount })
  }

  handleToggleLikeButtonPress = () => {
    const { likeCount, liked } = this.state

    if (this.busy || likeCount === null || liked === null) {
      return
    }

    this.busy = true

    const userId = firebaseAuth.currentUser.uid

    this.getArtistRef().transaction(artist => {
      if (artist) {
        if (artist.likes && artist.likes[userId]) {
          artist.likeCount--
          artist.likes[userId] = null
        } else {
          artist.likeCount++
          if (!artist.likes) {
            artist.likes = {}
          }
          artist.likes[userId] = true
        }
      }

      return artist
    })
    .then(() => this.busy = false)
  }

  getArtistRef() {
    const artistId = this.props.artist.id

    return firebaseDatabase.ref(`artists/${artistId}`)
  }

  render() {
    const { image, name, comments } = this.props.artist
    const { likeCount, liked } = this.state
    const likeIcon = liked ?
      <Icon name="ios-heart" size={32} color="#e74c3c" /> :
      <Icon name="ios-heart-outline" size={30} color="gray" />

    return (
      <View style={styles.artistBox}>
        <Image style={styles.image} source={{ uri: image }} />

        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.centeredRow}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={this.handleToggleLikeButtonPress}>
                {likeIcon}
              </TouchableOpacity>

              <Text style={styles.iconText}>{likeCount}</Text>
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
