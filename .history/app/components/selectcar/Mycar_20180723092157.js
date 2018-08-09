import React, { Component } from 'react';
import { View, Button ,Text} from 'react-native';
import { ListItem,List } from 'native-base';
import { Actions } from 'react-native-router-flux';

export class MyCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    
  }
  componentWillMount(){
    const uid = this.props.user.uid;
    this.props.MyCarlist(uid);
    console.log(uid);

    
  }
  componentWillReceiveProps(nextProps){
   
  }
  componentWillUpdate(){
     
  }


  render() {
    
    console.log(this.props.mycar)
    return (
      <View style={{}}>
        <Text>{JSON.stringify(Object.values(this.props.mycar))}</Text>
        <View>
            <List dataArray={this.props.mycar.car} 
            renderRow={(item) =>{
              return(
              <View>
                <Text>Model: {item}</Text>
                <Text>Speed: {item}</Text>
              </View>
              )
            }
            }>
          </List>
            </View>
      </View>
    );
  }
}