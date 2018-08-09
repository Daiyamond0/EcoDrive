import React, { Component } from 'react';
import { View, Button ,Text,FlatList} from 'react-native';

import { Actions } from 'react-native-router-flux';

export class CreateCar extends React.Component {
  render() {
    return (
      <View style={{}}>
        
        <Text>5555</Text>
        <FlatList
          data={this.props.cardata}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={{}}>
            <Text style={{}}>{item.Honda}</Text>
            <Text style={{}}>{item.Toyota}</Text>
          </View>
          }
          keyExtractor={item => item.Honda}
        />
      </View>
    );
  }
}