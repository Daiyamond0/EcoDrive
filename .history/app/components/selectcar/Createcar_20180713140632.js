import React, { Component } from 'react';
import { View, Button ,Text} from 'react-native';

import { Actions } from 'react-native-router-flux';

export class CreateCar extends React.Component {
  render() {
    return (
      <View style={{}}>
        <Text>{this.props.carlist.Honda}</Text>
        <Text>5555</Text>
      </View>
    );
  }
}