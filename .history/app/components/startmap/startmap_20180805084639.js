import React, { Component } from 'react';
import { View, Text,ScrollView } from 'react-native';
import firebaseService from '../../enviroments/firebase';
import { Actions } from 'react-native-router-flux';

export class StartMap extends React.Component {
  constructor() {
    super();
    // const firestore = firebaseService.firestore()
    this.ref = firebaseService.database().ref('Holds');
    this.unsubscribe = null;
    this.state = {
        loading: true,
        speed: [],
        distance: [],
        sum : 0,
        totalfueluse:0,
    };
    
}
componentDidMount() {
  this.unsubscribe = this.ref.on('value', this.onCollectionUpdate)
}



onCollectionUpdate = (snapshot) => {
  const speed = [];
  snapshot.forEach(function(childSnapshot) {
    // var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    
    speed.push(childData) 
  }.bind(this));
this.setState({ 
  speed,
  loading: false,
  totalfueluse: speed.totalfueluse
});
this.getDistance()
var sum = 0;
var numbers = this.state.distance;
  for (var i = 0; i < numbers.length; i++) {
    sum += Number.parseFloat(numbers[i],10)
  }
  this.setState({
    sum : sum/1000
  }); 
};



componentWillUnmount() {
  this.unsubscribe;
}

getDistance(){
  var a=[] ;
  this.state.speed.map(function(data , item){
    a.push(data.distance.toFixed(1));
    
  }.bind(this));
  this.setState({distance:a}); 
  console.log(a)
  
}

  render() {
    if (this.state.loading) {
      return null; 
    }
    return (
      <View style={{flex: 1 , justifyContent:'space-around'}}>
      <View style={{}}>
        <Text>StartMap</Text>
        <Text>{JSON.stringify(this.props.text)}</Text>
        <ScrollView>
            {/* <Text>5555</Text> */}
            {/* {this.getDistance()} */}
            {/* <Text>{this.props.speed}</Text> */}
            {/* <Text>{this.state.distance+","}</Text> */}
            <Text>{this.state.sum.toFixed(1)+","}</Text>
            <Text>{this.state.totalfueluse}</Text>
            </ScrollView>
            </View>
            <View style={{
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <View style={{width: 100, height: 100, backgroundColor: 'powderblue',alignItems:'center' ,justifyContent:'space-between'} }>
          <Text>accerelations</Text>
          <Text>50</Text>
          <Text>%</Text>
        </View>
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue',alignItems:'center' ,justifyContent:'space-between'}}>
        <Text>Fuelrate</Text>
          <Text>50</Text>
          <Text>Km/L</Text>
        </View>
        <View style={{width: 100, height: 100, backgroundColor: 'steelblue',alignItems:'center' ,justifyContent:'space-between'}}>
        <Text>CO2</Text>
          <Text>50</Text>
          <Text>KG</Text>
        </View>
      </View>
      </View>
    );
  }
}