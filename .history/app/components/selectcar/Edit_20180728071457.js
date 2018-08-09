import React, { Component } from 'react';
import { View, Button ,Text} from 'react-native';

import { Actions } from 'react-native-router-flux';

export class Edit extends React.Component {
  render() {
    return (
      <View style={{}}>
        <Text>Edit</Text>
        <Text>{JSON.stringify(this.props.editdetail)}</Text>
        <Text>{this.props.index}</Text>
      </View>
    );
  }
}