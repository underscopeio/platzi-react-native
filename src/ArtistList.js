import React, { Component } from 'react';
import {
  ListView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import ArtistBox from './ArtistBox'

export default class ArtistList extends Component {
  constructor(props) {
    super();
    this.state = {
      artistDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  updateDataSource(newData) {
    this.setState({
      artistDataSource: this.state.artistDataSource.cloneWithRows(newData)
    })
  }

  componentDidMount() {
    this.updateDataSource(this.props.artists)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.artists !== this.props.artists) {
      this.updateDataSource(nextProps.artists)
    }
  }

  render() {
    if (this.props.artists.length === 0) {
      return <ActivityIndicator color="black" size="large" style={styles.loading} />
    }

    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.artistDataSource}
        renderRow={artist => <ArtistBox artist={artist} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 20,
  }
})
