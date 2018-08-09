import React, { Component } from 'react';
import { View, Button ,Text} from 'react-native';

import { Actions } from 'react-native-router-flux';

export class SelectCar extends React.Component {
  render() {
    return (
      <View style={{flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:200}}>
          <View style={{margin:40}}>
            <Button onPress={Actions.mycar} title="MyCar"></Button>
          </View>
          <View style={{margin:40}}>
            <Button onPress={Actions.createcar} title="Create Car"></Button>
        </View>
        </View>
        
    );
  }
}