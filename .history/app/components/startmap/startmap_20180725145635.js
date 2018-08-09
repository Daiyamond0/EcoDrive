import React, { Component } from 'react';
import { View, Text,ScrollView } from 'react-native';
import firebaseService from '../../enviroments/firebase';
import { Actions } from 'react-native-router-flux';

export class StartMap extends React.Component {
  constructor() {
    super();
    this.ref = firebaseService.firestore().collection('Holds').orderBy('speedId','desc');
    this.unsubscribe = null;
    this.state = {
        loading: true,
        speed: [],
        distance: [],
        sum :0 ,
    };
    
}
componentDidMount() {
        
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  
}

componentWillUnmount() {
  this.unsubscribe();
  
}

onCollectionUpdate = (querySnapshot) => {
  
  const speed = [];
  querySnapshot.forEach((doc) => {
      const { speedId, distance } = doc.data();
      
      speed.push({
          key: doc.id,
          doc, // DocumentSnapshot
          speedId,
          distance,
        });
     
      // this.setState({distance:[...this.state.distance,distance]});
      
    });
    
    this.setState({ 
      speed,
      loading: false,
   });
   this.getDistance()
  //   this.state.speed.map((data , item) => 
  //  this.setState({ 
  //      distance: [...this.state.distance,data.distance]
  //  }));   
    var sum = 0;
    var numbers = this.state.distance;
      for (var i = 0; i < numbers.length; i++) {
        sum += Number.parseFloat(numbers[i],10)
      }

      this.setState({
        sum : sum
      });
   
   
   
}


getDistance(){
// this.state.speed.map((data , item) => 
//     this.setState({ 
//         distance: [...this.state.distance,data.distance]
//     }));   
var a=[] ;
this.state.speed.map(function(data , item){
  a.push(data.distance.toFixed(1));
});
this. setState({distance:a}); 

}

  render() {
    return (
      <View style={{}}>
        <Text>StartMap</Text>
        <Text>{JSON.stringify(this.props.text)}</Text>
      </View>
    );
  }
}