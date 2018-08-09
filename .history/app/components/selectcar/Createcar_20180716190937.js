import React, { Component } from 'react';
import { View, Button ,Text,FlatList} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { ListItem,List ,Picker} from 'native-base';
import firebaseService from '../../enviroments/firebase';

export class CreateCar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected: undefined,
      stores:[]
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  componentWillMount(){
    this.props.carlist()
    
    
  }
  componentDidMount(){

  }
  componentWillReceiveProps(){
    const make = this.props.select
    console.log("555"+make)
    const model = this.props.modelselect
    firebaseService.database().ref(`CarList/${make}/${model}`).on('value',function(snapshot){
      const detail = snapshot.val();
      console.log(detail)
      this.setState({ stores: detail })
}.bind(this), function(error) { console.log(error); });
  }
  
  

  render() {
    // console.log(typeof this.props.select);
    // const make = this.props.select
    // const model = this.props.modelselect
    // this.props.Cardetail()
    // const make = this.props.select
    // this.props.MakeCar(make)
   
    return (
      
      <View style={{}}>
       
        {/* <Text>5555</Text> */}
        {/* <List dataArray={this.state.stores} 
            renderRow={(item) =>{
              return(
              <ListItem>
                <Text>{Object.keys(item)[0]}</Text>
              </ListItem>
              )
            }
            }>
          </List> */}
         
          
      <Text>{JSON.stringify(this.state.stores)}</Text>
      <Text>{this.props.select}</Text>
      <Text>{this.props.modelselect}</Text>
      <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.props.select}
              onValueChange={this.props.onValueChange.bind(this)}
            >
       {Object.keys(this.props.cardata).map((item, index) => {
   return (< Picker.Item label={item} value={item} key={index} />);
        
})}   
            </Picker>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.props.modelselect} // change to props
              onValueChange={this.props.Modelchange.bind(this)} // change to props
            >
       {Object.keys(this.props.model).map((item, index) => {
   return (< Picker.Item label={item} value={item} key={index} />);
        
  })} 
            </Picker>
    
            {/* <List dataArray={Object.keys(this.state.stores)} 
            renderRow={(item) =>{
              return(
              <ListItem>
                <Text>{Object.keys(item)[0]}</Text>
              </ListItem>
              )
            }
            }>
          </List> */}
  
            
      </View>
      
    );
  }
}