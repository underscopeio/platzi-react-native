import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';

import ArtistBox from './ArtistBox'

export default class ArtistList extends Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      artistDataSource: ds.cloneWithRows(props.artists),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.artistDataSource}
        renderRow={artist => <ArtistBox artist={artist} />}
      />
    );
  }
}
