import React, { Component } from 'react';
import { View, Button ,Text,FlatList} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { ListItem,List } from 'native-base';

export class CreateCar extends React.Component {
  componentWillMount(){
    this.props.carlist
  }

  render() {
    return (
      <View style={{}}>
        
        <Text>5555</Text>
        <List dataArray={this.props.cardata}
            renderRow={(item) =>
              <ListItem>
                <Text>{item}</Text>
              </ListItem>
            }>
          </List>
      <Text>55555</Text>
      </View>
    );
  }
}