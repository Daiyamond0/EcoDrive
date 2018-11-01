import React, { Component } from 'react';
import { View, Text ,Image } from 'react-native';


export  class MycarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
      console.log(this.props.carinfo)
    return(
     <View> 
        <Image  style={{ width:300,height:200,alignItems:'center',marginHorizontal:30}} source={{uri: 'https://www.toyota.co.th/media/product/series/v/9/f366132f337b6f8526cae72f9479d5dce4dc37bb.png'}}/>
        <View>
          <Text style={{textAlign:'center',fontSize:36}}>Detail</Text>
          <Text style={{fontSize:24}}>Brand: {this.props.carinfo.Make}</Text>
          <Text style={{fontSize:24}}>Model: {this.props.carinfo.Model}</Text>
          <Text style={{fontSize:24}}>FuelConsumption: {this.props.carinfo.FuelConsumption} KM/L</Text>
          <Text style={{fontSize:24}}>CO2Emission: {((this.props.carinfo.FuelType.CO2Emission/this.props.carinfo.FuelConsumption)*100).toFixed(0)} G/KM</Text>
          <Text style={{fontSize:24}}>FuelType: {this.props.carinfo.FuelType.FuelType}</Text>
          <Text style={{fontSize:24}}>FuelCapacity: {this.props.carinfo.FuelCapacity} L</Text>
          <Text style={{fontSize:24}}>MaximumSpeed: {this.props.carinfo.MaximumSpeed} KM/H</Text>
          </View>
         
      </View>

    );
  }
}
