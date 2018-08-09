import React, { Component } from 'react';
import { View ,TouchableHighlight,StyleSheet,ListView ,Button,Text ,} from 'react-native';
import { ListItem,List ,Picker,Footer, FooterTab,Container} from 'native-base'
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
                <View>
                <TouchableHighlight >
              <ListItem >
                <Text>Make: {item.Make}{'\n'}
                      Model: {item.Model}{'\n'}
                      Speed:{item.Speed}{'\n'}
                      Fueltype: {item.FuelType.FuelType}{'\n'}
                </Text>

                <Button title='Remove' onPress={{}} style={{alignSelf: 'flex-end',}}/>
              </ListItem>
              
              </TouchableHighlight>
              </View>
              )
            }
            } >
          </List>
          
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
 
 
});
  
  