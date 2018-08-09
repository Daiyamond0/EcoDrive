import React, { Component } from 'react';
import { View, Button ,Text,TouchableHighlight,StyleSheet} from 'react-native';
import { ListItem,List } from 'native-base'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { Actions } from 'react-native-router-flux';

export class SelectMyCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount(){
   const uid = this.props.user.uid;
  this.props.MyCarlist(uid);
  }



  render() {
   
    return (
      <View style={styles.mainviewStyle}>
      
            <View>
            <RadioGroup onSelect = {(index,value) => this.props.onSelect(value)}>
            {this.props.mycar.map((item, index ) => {
            return (< RadioButton value={item} key={index}><Text>{item.Make+" "+item.Model}</Text></RadioButton>);
            })} 
      </RadioGroup>
           <Text>{this.props.text}</Text>
              </View>
              

            </View>
    );
  }
}

const styles = StyleSheet.create({
 
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  valueText: {
    fontSize: 18, 
    marginBottom: 50,
},
 
});