import React, { Component } from 'react';
import { View, Button ,Text,FlatList} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { ListItem } from 'native-base';

export class CreateCar extends React.Component {
  render() {
    return (
      <View style={{}}>
        
        <Text>5555</Text>
      <FlatList
        data={this.props.cardata}
        renderItem={({ item })=>(
          <ListItem
            roundAvatar
            Make={`${item.name}`}
          />
        )}
        keyExtractor={(item) => item.name}
      />
      <Text>55555</Text>
      </View>
    );
  }
}