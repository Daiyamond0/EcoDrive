import React, { Component } from 'react';
import { View, Button ,Text,TouchableHighlight,StyleSheet,ListView } from 'react-native';
import { ListItem,List ,Picker} from 'native-base'
import { Actions } from 'react-native-router-flux';


export class MyCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     carselected: [],
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
  test(){
    console.log('Test')
  }
  onValueChange(value) {
    this.setState({
      carselected: value
    });
  }

  render() {
    // console.log(this.props.mycar)
    console.log(this.state.carselected)
    return (
      <View style={{}}>
        {/* <Text>{JSON.stringify(Object.values(this.props.mycar)[0])}</Text> */}
        {/* <View>
            <List dataArray={Object.values(this.props.mycar)} 
            renderRow={(item) =>{
              return(
                <TouchableHighlight  style = {styles.rowStyle} underlayColor = '#008b8b' onPress={()=>this.test()}>
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
          
            </View> */}
            
            
            <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.state.carselected}
              onValueChange={this.onValueChange.bind(this)}
            >
              {Object.values(this.props.mycar).map((item, index) => {
              return (< Picker.Item label={item.Speed} value={[item.Model,item.Speed]}  key={index} />);
              })} 
            </Picker>
            

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