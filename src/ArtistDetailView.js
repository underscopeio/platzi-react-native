import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import ArtistBox from './ArtistBox'

export default class ArtistDetailView extends Component {
  render() {
    const { artist } = this.props

    return (
      <View style={styles.container}>
        <ArtistBox artist={artist} />
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
});
