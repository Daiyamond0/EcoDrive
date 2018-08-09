import React, { Component } from 'react';
import { View, Button ,Text,TouchableHighlight,StyleSheet} from 'react-native';
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
    // console.log(this.props.mycar)
    return (
      <View style={{}}>
        {/* <Text>{JSON.stringify(Object.values(this.props.mycar)[0])}</Text> */}
        <View>
            <List dataArray={Object.values(this.props.mycar)} 
            renderRow={(item) =>{
              return(
                <TouchableHighlight  style = {styles.rowStyle} underlayColor = '#008b8b'>
              <ListItem >
                <Text>Make: {item.Make}</Text>
                <Text>Model: {item.Model}</Text>
                <Text>Speed:{item.Speed} </Text>
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

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
  },
  rowText: {
      fontSize: 20,
      textAlign: 'center',
      color: '#FFFFFF'
  },
  rowStyle: {
      backgroundColor: '#333333',
      flex: 1,
      height: 100,
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
  },
});