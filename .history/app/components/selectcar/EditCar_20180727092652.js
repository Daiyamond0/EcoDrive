import React, { Component } from 'react';
import { View ,TouchableHighlight,StyleSheet,ListView ,Button,Text} from 'react-native';

import { Actions } from 'react-native-router-flux';

export class EditCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     carselected: [],
     
     
    };
     
    
  }

  componentWillMount(){
   const uid = this.props.user.uid;
  this.props.MyCarlist(uid);

  
  }
  
  
  
  onValueChange(value) {
    this.setState({
      carselected: value
    });
  }

  render() {
    // console.log(this.props.mycar)
    // console.log(this.state.carselected)
   

    return (
      
      <View style={styles.mainviewStyle}>
        {/* <Text>{JSON.stringify(this.props.mycar)}</Text> */}
        <View>
            <List dataArray={Object.values(this.props.mycar)} 
            renderRow={(item) =>{
              return(
                <TouchableHighlight >
              <ListItem >
                <Text>Make: {item.Make}</Text>
                <Text>Model: {item.Model}</Text>
                <Text>Speed:{item.Speed} </Text>
                <Text>Fueltype: {item.FuelType.FuelType}</Text>
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
  
  