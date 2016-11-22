import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FBSDK from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'

const { LoginButton, AccessToken } = FBSDK

const config = {
  apiKey: "AIzaSyD1l0Y2VrOh8MR2KsyM9T400xDg-qwf0YY",
  authDomain: "platzi-music.firebaseapp.com",
  databaseURL: "https://platzi-music.firebaseio.com",
  storageBucket: "platzi-music.appspot.com",
  messagingSenderId: "1085956110503"
}

firebase.initializeApp(config)

const firebaseAuth = firebase.auth()

export default class LoginView extends Component {
  state = {
  	credentials: null
  }

  componentWillMount() {
    this.authenticateUser()
  }

  authenticateUser() {
    AccessToken.getCurrentAccessToken()
      .then(credentials => {
        if (!credentials) {
          return null
        }

        const { FacebookAuthProvider } = firebase.auth
        const credential = FacebookAuthProvider.credential(credentials.accessToken)
        return firebaseAuth.signInWithCredential(credential)
      })
      .then(credentials => {
        this.setState({ credentials })
      })
  }

  handleOnLoginFinished(error, result) {
    if (error) {
      alert('Login failed with error: ' + result.error)
    } else if (result.isCancelled) {
      alert('Login was cancelled')
    } else {
      this.authenticateUser()
    }
  }

  handleOnLogoutFinished() {
    this.setState({ credentials: null })
  }

  handlePlatziMusicButtonPress() {
    Actions.root()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to PlatziMusic!
        </Text>

        {this.state.credentials !== null &&
          <TouchableOpacity style={styles.button} onPress={() => this.handlePlatziMusicButtonPress()}>
            <Text>Hi {this.state.credentials.displayName},</Text>
            <Text>Go to PlatziMusic!</Text>
          </TouchableOpacity>
        }

        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={(error, result) => this.handleOnLoginFinished(error, result)}
          onLogoutFinished={() => this.handleOnLogoutFinished()}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    padding: 15,
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  }
})
