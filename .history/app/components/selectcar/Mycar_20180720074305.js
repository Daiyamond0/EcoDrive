import React, { Component } from 'react';
import { View, Button ,Text} from 'react-native';

import { Actions } from 'react-native-router-flux';

export class MyCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    
  }
  componentWillMount(){
     
  }
  componentWillReceiveProps(nextProps){
    const uid = this.props.user.uid;
    this.props.MyCarlist(uid);
    console.log(uid);
  }
componentDidMount(){
}


  render() {
    
    return (
      <View style={{}}>
        <Text>{JSON.stringify(this.props.mycar)}</Text>
      </View>
    );
  }
}