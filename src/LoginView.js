import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FBSDK from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'

const { LoginButton, AccessToken } = FBSDK

export default class LoginView extends Component {
  state = {
  	credentials: null
  }

  componentWillMount() {
    AccessToken.getCurrentAccessToken()
      .then(credentials => this.setState({ credentials }))
  }

  handleOnLoginFinished(error, result) {
    if (error) {
      alert('Login failed with error: ' + result.error)
    } else if (result.isCancelled) {
      alert('Login was cancelled')
    } else {
      AccessToken.getCurrentAccessToken()
        .then(credentials => {
          this.setState({ credentials })
      })
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
    backgroundColor: 'lightgray',
  }
})
