import React, { Component } from 'react';
import { View, Button ,Text,FlatList} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'native-base';

export class CreateCar extends React.Component {
  render() {
    return (
      <View style={{}}>
        
        <Text>5555</Text>
        <FlatList
          data={this.props.cardata.Honda}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={{}}>
            <Text style={{}}>{item.Accord}</Text>
            <Text style={{}}>{item.City}</Text>
          </View>
          }
          keyExtractor={item => item.Accord}
        />
        <List>
          <FlatList
            data={this.props.cardata}
            renderItem={({item})=> (
            <ListItem
              roundAvatar
              Make={$`{item.Honda}}
            />
            )}
          />  
        </List>
      </View>
    );
  }
}