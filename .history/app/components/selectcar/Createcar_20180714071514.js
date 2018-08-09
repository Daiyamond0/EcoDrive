import React, { Component } from 'react';
import { View, Button ,Text,FlatList} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'native-base';

export class CreateCar extends React.Component {
  render() {
    return (
      <View style={{}}>
        
        <Text>5555</Text>
        <List>
          <FlatList
            data={this.props.cardata.Honda}
            renderItem={({item})=> (
            <ListItem
              roundAvatar
              Make={$`{item.Accord}`}
            />
            )}
            keyExtractor={item => item.Accord}
          />  
        </List>
      </View>
    );
  }
}