import React, { Component } from 'react';
import { View, Text ,Image,ScrollView ,StyleSheet} from 'react-native';

import firebaseService from '../../enviroments/firebase'
export  class MycarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sumDistance:[],
      sumFueluse:[],
      sumCo2:[],
    };
  }
componentWillMount = () => {
  var sumDistance = []
    var sumFueluse = []
    var sumCo2 =[]
    const uid = this.props.user.uid
    
    firebaseService.database().ref(`History/${uid}/`).once(
        'value',
        function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
              const car = childSnapshot.val()
              if((this.props.carinfo.Make +' '+ this.props.carinfo.Model).includes(car.Car.Make +' '+ car.Car.Model)){
                sumDistance.push(car.Distance)
                sumFueluse.push(parseFloat(car.Fueluse))
                sumCo2.push(parseFloat(car.CO2))
                this.setState({sumDistance: sumDistance.reduce((a, b) => a + b)})
                this.setState({sumFueluse: sumFueluse.reduce((a, b) => a + b)})
                this.setState({sumCo2: sumCo2.reduce((a, b) => a + b)})

              }
            
              
              
          }.bind(this))
          
        }.bind(this),
        function (error) {
          console.log(error)
        }
      )
}


  render() {
      // console.log(this.props.carinfo)
    return(
    <View style={styles.mainviewStyle}>
    <ScrollView>
  <View style={{marginTop:10,marginLeft:10,height:150,width:340,borderBottomWidth:0.25,borderColor:'#888888',backgroundColor:'#fcfcfc',alignSelf:'center',alignItems:'center',flexDirection:'column'}}>
  <Image
      style={{width: 180, height: 120}}
      source={{uri: this.props.carinfo.img}}
    />
  <Text style={{marginBottom:10,fontSize:20,color:'black',alignSelf:'center'}}>{this.props.carinfo.Nickname}</Text>
  </View>
   <View style={{marginTop:10,width:320,height:200,backgroundColor:'white',alignSelf:'center',borderBottomWidth:0.25,borderColor:'#888888',backgroundColor:'#fcfcfc'}}>
   <View style={{flexDirection:'row',marginTop:15}}>
   <Text style={{marginLeft:15,fontSize:20,color:'black'}}>Brand & Model</Text>
   </View>
   <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
   <View style={styles.box1}>
   <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>Brand</Text>
   </View>
   <View style={styles.box2}>
   <Text style={{fontSize:13,color:'white',marginLeft:10}}>{this.props.carinfo.Make}</Text>
   </View>
   </View>
   <View style={{flexDirection:'row',marginTop:5,alignSelf:'center'}}>
   <View style={styles.box1}>
   <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>Model</Text>
   </View>
   <View style={styles.box2}>    
   <Text style={{fontSize:13,color:'white',marginLeft:10}}>{this.props.carinfo.Model}</Text>
   </View>
   </View>
   <View style={{flexDirection:'row',marginTop:5,alignSelf:'center'}}>
   <View style={styles.box1}>
   <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>Max Speed</Text>
   </View>
   <View style={styles.box2}>    
   <Text style={{fontSize:15,color:'white',marginLeft:10}}>{this.props.carinfo.MaximumSpeed} KM/H</Text>
   </View>
   </View>
   </View>
   <View style={{marginTop:10,width:320,height:250,backgroundColor:'white',alignSelf:'center',borderBottomWidth:0.25,borderColor:'#888888',backgroundColor:'#fcfcfc'}}>
   <View style={{flexDirection:'row',marginTop:15}}>
   <Text style={{marginLeft:15,fontSize:20,color:'black'}}>Fuel</Text>
   </View>
   <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
   <View style={styles.box1}>
   <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>FuelType</Text>
   </View>
   <View style={styles.box2}>
   <Text style={{fontSize:13,color:'white',marginLeft:10}}>{this.props.carinfo.FuelType.FuelType}</Text>
   </View>
   </View>
   <View style={{flexDirection:'row',marginTop:5,alignSelf:'center'}}>
   <View style={styles.box1}>
   <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>Fuel Capacity</Text>
   </View>
   <View style={styles.box2}>
   <Text style={{fontSize:13,color:'white',marginLeft:10}}>{this.props.carinfo.FuelCapacity} L</Text>
   </View>
   </View>
   <View style={{flexDirection:'row',marginTop:5,alignSelf:'center'}}>
   <View style={styles.box1}>
   <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>Fuel Consumtion</Text>
   </View>
   <View style={styles.box2}>
   <Text style={{fontSize:15,color:'white',marginLeft:10}}>{this.props.carinfo.FuelConsumption} KM/L</Text>
   </View>
   </View>
   <View style={{flexDirection:'row',marginTop:5,alignSelf:'center'}}>
   <View style={styles.box3}>
   <Text style={{fontSize:13,color:'#ff4d88',marginLeft:15}}>Total Fuel used</Text>
   </View>
   <View style={styles.box4}>
   <Text style={{fontSize:13,color:'white',marginLeft:10}}>{parseFloat(this.state.sumFueluse).toFixed(2) } L</Text>
   </View>
   </View>
   </View>
   <View style={{marginTop:10,width:320,height:160,backgroundColor:'white',alignSelf:'center',borderBottomWidth:0.25,borderColor:'#888888',backgroundColor:'#fcfcfc'}}>
   <View style={{flexDirection:'row',marginTop:15}}>
   <Text style={{marginLeft:15,fontSize:20,color:'black'}}>CO2</Text>
   </View>
   <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
   <View style={styles.box1}>
   <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>CO2 Emission</Text>
   </View>
   <View style={styles.box2}>       
   <Text style={{fontSize:13,color:'white',marginLeft:10}}> {((this.props.carinfo.FuelType.CO2Emission/this.props.carinfo.FuelConsumption)*100).toFixed(0)} G/KM</Text>
   </View>
   </View>
   <View style={{flexDirection:'row',marginTop:5,alignSelf:'center'}}>
   <View style={styles.box3}>       
   <Text style={{fontSize:13,color:'#ff4d88',marginLeft:15}}>Total CO2 Emission</Text>
   </View>
   <View style={styles.box4}>       
   <Text style={{fontSize:13,color:'white',marginLeft:10}}>{ parseFloat(this.state.sumCo2).toFixed(2) } KG</Text>
   </View>
   </View>
   </View>
   <View style={{marginTop:10,width:320,height:110,backgroundColor:'white',alignSelf:'center',borderBottomWidth:0.25,borderColor:'#888888',backgroundColor:'#fcfcfc'}}>
   <View style={{flexDirection:'row',marginTop:15}}>
   <Text style={{marginLeft:15,fontSize:20,color:'black'}}>Distance</Text>
   </View>
   <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
   <View style={styles.box3}>       
   <Text style={{fontSize:13,color:'#ff4d88',marginLeft:15}}>Total Travel Distance</Text>
   </View>
   <View style={styles.box4}>      
   <Text style={{fontSize:13,color:'white',marginLeft:10}}>{this.state.sumDistance} KM</Text>
   </View>
   </View>
   </View>
   <View style={{height:20,backgroundColor:'white'}}>
   </View>
  </ScrollView>
  </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'white',
  },
  box1:{
    justifyContent:'center'
    ,width:135
    ,height:40
    ,backgroundColor:'white'
    ,borderColor:'#6a83fb'
    ,borderWidth:0.5
    ,borderTopLeftRadius:5
    ,borderBottomLeftRadius:5
  },
  box2:{
    justifyContent:'center'
    ,width:135
    ,height:40
    ,backgroundColor:'#6a83fb'
    ,borderColor:'#6a83fb'
    ,borderWidth:0.5
    ,borderTopRightRadius:5
    ,borderBottomRightRadius:5
  },
  box3:{
    justifyContent:'center'
    ,width:135
    ,height:40
    ,backgroundColor:'white'
    ,borderColor:'#ff4d88'
    ,borderWidth:0.5
    ,borderTopLeftRadius:5
    ,borderBottomLeftRadius:5
  },
  box4:{
    justifyContent:'center'
    ,width:135
    ,height:40
    ,backgroundColor:'#ff4d88'
    ,borderColor:'#ff4d88'
    ,borderWidth:0.5
    ,borderTopRightRadius:5
    ,borderBottomRightRadius:5
  }
  })