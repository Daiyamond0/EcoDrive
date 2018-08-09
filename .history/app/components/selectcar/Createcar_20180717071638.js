import React, { Component } from 'react';
import { View, Button ,Text,FlatList,TouchableHighlight} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { ListItem,List ,Picker} from 'native-base';
import firebaseService from '../../enviroments/firebase';

export class CreateCar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      series: undefined,
      details:[]
    };
  }
  onValueChange(value) {
    this.setState({
      series: value
    });
  }
  componentWillMount(){
    this.props.carlist()
    
    
  }
  componentDidUpdate(){
  
  }
  componentWillReceiveProps(nextProps){
    const make = this.props.select
    const model = nextProps.modelselect
    console.log(make)
    console.log(model)
    if(model != null && make != null   ){
    firebaseService.database().ref(`CarList/${make}/${model}`).on('value',function(snapshot){
      const detail = snapshot.val();
      this.setState({ details: detail })
}.bind(this), function(error) { console.log(error); });
    }
  }
  
  CarDetail = () => {
    // const make = this.props.select
    // const model = this.props.modelselect
    // const series = Object.keys(this.state.series)

  }
  

  render() {
    console.log(typeof this.state.details);
    // const make = this.props.select
    // const model = this.props.modelselect
    // this.props.Cardetail()
    // const make = this.props.select
    // this.props.MakeCar(make)
   
    return (
      
      <View style={{}}>
       
        {/* <Text>5555</Text> */}
        <List dataArray={this.state.details} 
            renderRow={(item) =>{
              return(
              <ListItem>
                <Text>{Object.values(item.Speed)[1]}</Text>
              </ListItem>
              )
            }
            }>
          </List>
      <Text>{JSON.stringify(this.state.details)}</Text>
      {/* <Text>{this.props.select}</Text>
      <Text>{this.props.modelselect}</Text> */}
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

             <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.state.series}
              onValueChange={this.onValueChange.bind(this)}
            >
              {this.state.details.map((item, index) => {
              return (< Picker.Item label={Object.values(item)[0]} value={Object.values(item)[0]} key={index} />);
              })} 
            </Picker>
            <TouchableHighlight>
              <Button title="Go" onPress=""/>
            </TouchableHighlight>
      </View>
      
    );
  }
}