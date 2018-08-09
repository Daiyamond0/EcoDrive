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
    
    return (
      <View style={{}}>
        <Text>{JSON.stringify(Object.values(this.props.mycar)[0])}</Text>
        {/* <View>
            <List dataArray={this.props.mycar.car} 
            renderRow={(item) =>{
              return(
              <View>
                <Text>Model: {item.Model}</Text>
                <Text>Speed: {item.Speed}</Text>
              </View>
              )
            }
            }>
          </List>
            </View> */}
      </View>
    );
  }
}