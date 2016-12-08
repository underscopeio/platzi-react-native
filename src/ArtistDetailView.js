import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import ArtistBox from './ArtistBox'
import CommentList from './CommentList'
import { getArtists } from './api-client'

import { firebaseDatabase, firebaseAuth } from './firebase'

export default class ArtistDetailView extends Component {
  state = {
    comments: []
  }

  handleBackButtonPress() {
    Actions.pop()
  }

  componentDidMount() {
    this.getArtistCommentsRef().on('child_added', this.addComment);
  }

  componentWillUnmount() {
    this.getArtistCommentsRef().off('child_added', this.addComment);
  }

  addComment = (data) => {
    const comment = data.val()
    this.setState({
      comments: this.state.comments.concat(comment)
    })
  }

  handleSend = () => {
    const { text } = this.state
    const { uid, photoURL } = firebaseAuth.currentUser
    const artistCommentsRef = this.getArtistCommentsRef()
    var newCommentRef = artistCommentsRef.push();
    newCommentRef.set({
      text,
      userPhoto: photoURL,
      uid,
    });
    this.setState({ text: '' })
  }

  getArtistCommentsRef = () => {
    const { id } = this.props.artist
    return firebaseDatabase.ref(`comments/${id}`)
  }

  handleChangeText = (text) => this.setState({text})

  render() {
    const { artist } = this.props
    const { comments } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.handleBackButtonPress}>
            <View style={styles.backButton}>
              <Icon name="ios-arrow-round-back" size={32} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Comentarios</Text>
          <View style={styles.backButton} />
        </View>
        <ArtistBox artist={artist} />
        <CommentList comments={comments} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            placeholder="Opina sobre este artista"
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity onPress={this.handleSend}>
            <Icon name="ios-send-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
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
  inputContainer: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
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
  input: {
    height: 50,
    flex: 1,
  }
});
