import React, { Component } from 'react';
import { View, Button ,Text} from 'react-native';

import { Actions } from 'react-native-router-flux';

export class StartMap extends React.Component {
  render() {
    return (
      <View style={{}}>
        <Text>StartMap</Text>
        <Text>{JSON.stringify(this.props.text)}</Text>
      </View>
    );
  }
}