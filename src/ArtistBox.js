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
    busy: false,
    liked: null,
    likes: null,
  }

  componentWillMount() {
    this.getArtistLikesRef().on('value', this.handleArtistLikesOnValue)
    this.getArtistLikeCountRef().on('value', this.handleArtistLikeCountOnValue)
  }

  componentWillUnmount() {
    this.getArtistLikesRef().off('value', this.handleArtistLikesOnValue)
    this.getArtistLikeCountRef().off('value', this.handleArtistLikeCountOnValue)
  }

  handleArtistLikesOnValue = snapshot => {
    this.setState({ liked: snapshot.val() === true })
  }

  handleArtistLikeCountOnValue = snapshot => {
    this.setState({ likes: snapshot.val() || 0 })
  }

  handleToggleLikeButtonPress = () => {
    const { likes, liked, busy } = this.state

    if (likes === null || liked === null || busy) {
      return
    }

    this.setState({ busy: true })

    this.getArtistLikeCountRef().transaction(val => {
      val = (val || 0)
      return val + (liked ? -1 : 1)
    })

    this.getArtistLikesRef().set(!liked).then(() => {
      this.setState({ busy: false })
    })
  }

  getArtistLikesRef() {
    const artistId = this.props.artist.id
    const userId = firebaseAuth.currentUser.uid

    return firebaseDatabase.ref(`artists/${artistId}/likes/${userId}`)
  }

  getArtistLikeCountRef() {
    const artistId = this.props.artist.id

    return firebaseDatabase.ref(`artists/${artistId}/likeCount`)
  }

  render() {
    const { image, name, comments } = this.props.artist
    const { likes, liked, busy } = this.state

    return (
      <View style={styles.artistBox}>
        <Image style={styles.image} source={{ uri: image }} />

        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.centeredRow}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={this.handleToggleLikeButtonPress}>
                <Icon name={liked ? 'ios-heart' : 'ios-heart-outline'} size={32} color="gray" />
              </TouchableOpacity>

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
