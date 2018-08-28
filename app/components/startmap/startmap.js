import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import firebaseService from '../../enviroments/firebase'
import { Actions } from 'react-native-router-flux'

export class StartMap extends React.Component {
  constructor () {
    super()
    this.ref = firebaseService.database().ref('Speed')
    this.unsubscribe = null

    this.state = {
      loading: true,
      speed: [],
      distance: [],
      sum: 0,
      totalfueluse: [],
      co2: [],
      acceleration: []
    }
  }
  componentDidMount () {
    this.unsubscribe = this.ref.on('value', this.onCollectionUpdate)
  }

  onCollectionUpdate = snapshot => {
    const speed = []
    snapshot.forEach(
      function (childSnapshot) {
        // var childKey = childSnapshot.key;
        var childData = childSnapshot.val()

        speed.push(childData)
      }
    )
    this.setState({
      speed,
      loading: false
    })
    this.getDistance()
    var sum = 0
    var numbers = this.state.distance
    for (var i = 0; i < numbers.length; i++) {
      sum += Number.parseFloat(numbers[i], 10)
    }
    this.setState({
      sum: sum / 1000
    })
    // this.setState({co2:[...this.state.co2,100/(this.state.sum.toFixed(1) / this.state.totalfueluse[this.state.totalfueluse.length - 1])]})
  }

  componentWillUnmount () {
    this.unsubscribe
  }

  getDistance () {
    var a = []
    var b = []
    var c = []
    this.state.speed.map(
      function (data, item) {
        a.push(data.distance.toFixed(1))
        b.push(data.totalfueluse)
        c.push(data.acceleration)
      }
    )
    this.setState({ distance: a })
    this.setState({ totalfueluse: b })
    this.setState({ acceleration: c })
    console.log(a)
  }

  changeColor(){
    const acceleration = this.state.acceleration
    if(acceleration[acceleration.length - 1]< 50){
      return{
        color:'green'
      }
    }
     if(acceleration[acceleration.length - 1]>=50 &&acceleration[acceleration.length - 1]<70){
      return{
        color:'orange'
      }
    } if(acceleration[acceleration.length - 1] >= 70){
      return{
        color:'red'
      }
    } 
    
  }

  fuelconsumption(){
    const acceleration = this.state.acceleration
    const totalfueluse = this.state.totalfueluse
    const fuelconsumption =
      this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1] 
     
      if(acceleration[acceleration.length - 1]< 50  ){
        return(
          <Text>{Number.parseFloat(fuelconsumption.toFixed(1))}</Text>
          
        )
      }
       if(acceleration[acceleration.length - 1]>=50 &&acceleration[acceleration.length - 1]<70){
        return(
          <Text>{Number.parseFloat(fuelconsumption.toFixed(1),10) +parseInt(10) }</Text>
          
        )
      } if(acceleration[acceleration.length - 1] >= 70){
        return(
          <Text>{Number.parseFloat(fuelconsumption.toFixed(1),10) + parseInt(20)}</Text>
          // <Text>777</Text>
        )
      } 
  }

  render () {
    if (this.state.loading) {
      return null
    }
    const totalfueluse = this.state.totalfueluse
    const fuelconsumption =
      this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1]
    const co2 =
      totalfueluse[totalfueluse.length - 1] *
      this.props.text.FuelType.CO2Emission

    const acceleration = this.state.acceleration

    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <View style={{}}>
          <Text style={this.changeColor()}>StartMap</Text>
          <Text>CO2Emission: {JSON.stringify(this.props.text.FuelType.CO2Emission)}</Text>
          <ScrollView>
            {/* <Text>5555</Text> */}
            {/* {this.getDistance()} */}
            {/* <Text>{this.props.speed}</Text> */}
            {/* <Text>{this.state.distance+","}</Text> */}
            <Text>Distance: {this.state.sum.toFixed(1) + ','}</Text>
            <Text>FuelUse: {totalfueluse[totalfueluse.length - 1]}</Text>
            <Text>CO2: {co2}</Text>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'powderblue',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text>accerelations</Text>
            <Text>{acceleration[acceleration.length - 1]}</Text>
            <Text>%</Text>
          </View>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'skyblue',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text>Fuelrate</Text>
            {this.fuelconsumption()}
            <Text>Km/L</Text>
          </View>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'steelblue',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text>CO2</Text>
            <Text>{parseInt(co2)}</Text>
            <Text>G/KM</Text>
          </View>
        </View>
      </View>
    )
  }
}
