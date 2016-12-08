import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';

import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'

import { Actions } from 'react-native-router-flux'

import firebase, {
  firebaseAuth
} from './firebase'

const { FacebookAuthProvider } = firebase.auth

export default class LoginView extends Component {
  state = {
    credentials: null
  }

  componentWillMount() {
    this.authenticateUser()
  }

  authenticateUser = () => {
    this.setState({ loading: true })
    AccessToken.getCurrentAccessToken().then((data) => {
      if (!data) {
        return
      }
      const { accessToken } = data
      const credential = FacebookAuthProvider.credential(accessToken)
      firebaseAuth.signInWithCredential(credential).then((credentials) => {
        Actions.root()
      }, (error) => {
        console.log("Sign In Error", error);
      });
    })
  }

  handleLoginFinished = (error, result) => {
    if (error) {
      console.error(error)
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      this.authenticateUser()
    }
  }

  render() {
    return (
      <Image source={require('./background.jpg')} style={styles.container}>
        <Text style={styles.welcome}>
          Bienvenidos a PlatziMusic
        </Text>
        <Image source={require('./logo.png')} style={styles.logo} />
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color="white"
          animating={this.state.loading} />
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={this.handleLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  spinner: {
    marginVertical: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: 'white',
  }
});
