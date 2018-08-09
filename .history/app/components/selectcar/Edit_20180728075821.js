import React, { Component } from 'react';
import { View ,TouchableHighlight,StyleSheet,ListView ,Button,Text , TouchableOpacity} from 'react-native';
import { ListItem,List ,Picker,Footer, FooterTab,Container} from 'native-base'
import { Actions } from 'react-native-router-flux';

export class Edit extends React.Component {
  render() {
    return (
      <View style={{}}>
        <Text>Edit</Text>
        <Text>{this.props.index}</Text>
        <Text>{JSON.stringify(this.props.editdetail)}</Text>
        <View>
            <List dataArray={this.props.editdetail} 
            renderRow={(item,index,key) =>{
              return(
                <TouchableHighlight >
              <ListItem>
                <View >
                <Text>Make: {item.Make}</Text>
                <Text>Model: {item.Model}</Text>
                <Text>Speed:{item.Speed} </Text>
                <Text>Fueltype: {item.FuelType.FuelType}</Text>
                </View>
              </ListItem>            
              </TouchableHighlight>
              
              )
            }
            } >
          </List>
            </View>

      </View>
    );
  }
}