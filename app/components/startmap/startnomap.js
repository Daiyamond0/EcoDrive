/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'

let date = new Date();

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  PermissionsAndroid,
  Button,
  Image,
  BackHandler,
  Geolocation ,
  Animated,
  ScrollView,
  Vibration
} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import RNGooglePlaces from 'react-native-google-places'
import MapViewDirections from 'react-native-maps-directions'
import Autocomplete from 'react-native-autocomplete-input'
import Simulator from '../../../modules/Simulator';
import SlidingUpPanel from 'rn-sliding-up-panel'
import TimerMixin from 'react-timer-mixin'
import { Dialog } from 'react-native-simple-dialogs';
import Geocoder from 'react-native-geocoding';
import { Actions } from 'react-native-router-flux'
import firebaseService from '../../enviroments/firebase'


export  class StartNoMap extends Component {

  constructor (props) {
    super(props)
    
    
    this.state = {
     
     
      speed: [],
      distance: [],
      sum: 0,
      totalfueluse: [],
      speedId:[],
      acceleration: [],
      distancedrive :[],
      intervalId:null,
      sumdistance1:0,
      sumdistance2:0,
      i:0,
      j:1,
      k:2,
      summarydistance:[],
      summaryco2:[],
      summaryduration:'',
      durationtime:'00.00.00',
      summaryfueluse:0,
      summaryfuelconsumtion:0,
      date:'',
      summarysource:'',
      summarydestination:'',
      dialogVisible:false,
      timestart:'',
      timeend:'',
      fuelraterealtime:[],

      historylength : 0,

      Modalkeepdata:false
    }
   
   
    this.ref = firebaseService.database().ref('Speed');
    this.unsubscribe = null;
    this.intervalId = null;
    
  }

  componentWillMount =()=> {
    var d = new Date()
    this.setState({timestart:d.getHours()+':'+d.getMinutes()})

    this.state.markerPosition = this.props.markerPosition;
    firebaseService.database().ref('Speed').remove()
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    if(dd<10) {
      dd='0'+dd;
    } 
    if(mm<10) {
    mm='0'+mm;
    }
    this.setState({date:yyyy + '-' + mm + '-'+ dd}) 

    const uid = this.props.user.uid
    var history =[]
    firebaseService.database().ref(`History/${uid}`).on(
      'value',
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            const his = childSnapshot.val()
            history.push(his)
            this.setState({historylength:history.length})
        }.bind(this))
        
      }.bind(this),
      function (error) {
        console.log(error)
      }
    )
    
    if(this.props.popup == true){
      this.setState({Modalkeepdata:true})
    }else{
      this.setState({Modalkeepdata:false})
    }

  }
  

  componentDidMount (){
    
    this.unsubscribe = this.ref.on('value', this.onCollectionUpdate)
    var totalSeconds = 0;
this.durationtime = setInterval(()=>{
  var totalfueluse = this.state.totalfueluse
  if(this.state.sum !=0 ){

  ++totalSeconds;
  var hour = Math.floor(totalSeconds /3600);
  var minute = Math.floor((totalSeconds - hour*3600)/60);
  var seconds = totalSeconds - (hour*3600 + minute*60);
if(hour<10){
  hour='0'+hour
}
if(minute<10){
  minute='0'+minute
}
if(seconds<10){
  seconds='0'+seconds
}
  this.setState({durationtime: hour + ":" + minute + ":" + seconds })
  this.setState({
    fuelraterealtime: [...this.state.fuelraterealtime,this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1]]
  })
  
   
    var co2 =((100 / this.props.carconnect.FuelConsumption) * this.props.carconnect.FuelType.CO2Emission) * Number.parseFloat(this.state.sum.toFixed(2))
    var distance = Number.parseFloat(this.state.sum);
    this.setState({summarydistance:distance}) 
    this.setState({summaryco2:parseFloat(co2 / 1000).toFixed(2)})
    this.setState({summaryfueluse:this.state.totalfueluse[this.state.totalfueluse.length - 1]})
    this.setState({summaryfuelconsumtion:this.state.sum.toFixed(1) / this.state.totalfueluse[this.state.totalfueluse.length - 1]})
}},1000)
   
  }
  onCollectionUpdate = (snapshot) => {
    
    var speed = []
     snapshot.forEach(
      function (childSnapshot) {
        var childData = childSnapshot.val()
        speed.push(childData)
      }
      
    )
       this.setState({
      speed:speed
    })
    
    this.getDistance()
    var sum = 0
    const numbers = this.state.distance
    for (const i = 0; i < numbers.length; i++) {
      sum += Number.parseFloat(numbers[i], 10)
      
    }
    this.setState({
      sum: sum / 1000
    })
   
    
    
    
    
    
   // this.setState({co2:[...this.state.co2,100/(this.state.sum.toFixed(1) / this.state.totalfueluse[this.state.totalfueluse.length - 1])]})
  }

  componentWillUnmount() {
    
    clearInterval(this.intervalId)
    clearInterval(this.durationtime)
  }

  getDistance () {
    var a = []
    var b = []
    var c = []
    var d = []
    this.state.speed.map(
      (data) => {
        a.push(data.distance.toFixed(1))
        b.push(data.totalfueluse)
        c.push(data.acceleration)
        d.push(data.speedId)
      }
      
    )
    this.setState({ distance: a })
    this.setState({ totalfueluse: b })
    this.setState({ acceleration: c })
    this.setState({ speedId: d })
    // console.log(a)
    
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

  Notification(){
    const totalfueluse = this.state.totalfueluse
    const fuelconsumption = this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1] 
    const acceleration = this.state.acceleration
     if( fuelconsumption < this.props.carconnect.FuelConsumption- (this.props.carconnect.FuelConsumption * 0.2)){
        // Vibration.vibrate(2000)
        // Vibration.cancel()
      return{
        position:'absolute',
        left: 0,
        bottom:50,
        right:0,
        flexDirection: 'row',
        flex:1,
        backgroundColor: 'orange'
      }
      }if(fuelconsumption < this.props.carconnect.FuelConsumption - (this.props.carconnect.FuelConsumption * 0.3)){
      // Vibration.vibrate(2000)
      // Vibration.cancel()
      return{
        position:'absolute',
        left: 0,
        bottom:50,
        right:0,
        flexDirection: 'row',
        flex:1,
        backgroundColor: 'red',
      }
    } 
      if(acceleration[acceleration.length - 1]>=50 &&acceleration[acceleration.length - 1]<70){
       return{
        position:'absolute',
        left: 0,
        bottom:50,
        right:0,
        flexDirection: 'row',
        flex:1,
        backgroundColor: 'orange'
      }
    } if(acceleration[acceleration.length - 1] >= 70){
        return{
        position:'absolute',
        left: 0,
        bottom:50,
        right:0,
        flexDirection: 'row',
        flex:1,
        backgroundColor: 'red',
      }
    }
        return {
        position:'absolute',
        left: 0,
        bottom:50,
        right:0,
        flexDirection: 'row',
        flex:1,
        backgroundColor: 'green'
    }
     
  }

  
 SaveTrip(){
  var d = new Date()
  this.setState({timeend:d.getHours()+':'+d.getMinutes()})
  this.setState({dialogVisible: true})
  clearInterval(this.durationtime)

  }
  AddHistory(){
    this.setState({dialogVisible: false})
    const uid = this.props.user.uid
  
    firebaseService.database().ref(`History/${uid}/${this.state.historylength++}`).set({
            Car:this.props.carconnect,
            Distance: parseInt(this.state.summarydistance),
            CO2: this.state.summaryco2 ,
            Duration: this.state.durationtime,
            Fueluse: parseFloat(this.state.summaryfueluse).toFixed(1), 
            Fuelrate: parseInt(this.state.summaryfuelconsumtion),
            Date: this.state.date,
            Source: 'Unknown',
            Destination: 'Unknown',
            Time:this.state.timestart,
            Timeend:this.state.timeend,
            fuelraterealtime:this.state.fuelraterealtime
     })
    Actions.popTo('home')
  }
  parsedate(date){
    
    var d = new Date(date)
    return (
      <Text>{d.toDateString()}</Text>
    )
  }

 
  render () {
console.log(this.props.popup)
    
    const totalfueluse = this.state.totalfueluse
    const fuelconsumption = this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1]
    // const co2 = totalfueluse[totalfueluse.length - 1] * this.props.carconnect.FuelType.CO2Emission
    const co2 =((100 / this.props.carconnect.FuelConsumption) * this.props.carconnect.FuelType.CO2Emission) * Number.parseFloat(this.state.sum.toFixed(2))
    const acceleration = this.state.acceleration
    
  
   
    const pic = '.././Image/carmap.png'
    return (
      <View style={styles.container}>
        
       
       

          
      <View style={{flexDirection:'row',flex:1}}>


<View style={styles.zoom}>
<View>
  <Button title='SaveTrips' onPress={()=>this.SaveTrip()}/>
  </View>
<View style={{flex:1,flexDirection:'column',borderColor:'#6a83fb', borderWidth: 2,}}>
<TouchableOpacity onPress={Actions.startmap}>
  <Text style={styles.zoomtext}>Go navigate</Text>
  </TouchableOpacity>
</View>
<View style={{flex:1,flexDirection:'column',borderColor:'#6a83fb', borderWidth: 2,}}>
  <Text style={{textAlign:'center',color:'#6a83fb',fontSize:10,fontWeight:'300',paddingHorizontal: 5,}}>FuelConsumtion Standard: {this.props.carconnect.FuelConsumption} KM/L</Text>
</View>
</View>
<View style={this.Notification()}>
{/* <View style={{}}> */}
   {/* <View style={styles.infoWrapper}> */}
          <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
          <Image
          style={{width: 35, height: 35,marginLeft: 40}}
          source={require('./car.png')}
        />
           {acceleration[acceleration.length - 1] != null ? <Text style={styles.runInfoValue}>{acceleration[acceleration.length - 1]}</Text> :<Text style={styles.runInfoValue}>-</Text> }
            <Text style={styles.runInfoTitle}>%</Text>
          </View>
          <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
          <Image
          style={{width: 40, height: 40,marginLeft:40}}
          source={require('./gas.png')}
        />   
            <Text style={styles.runInfoValue}>{fuelconsumption.toFixed(1)}</Text>
            <Text style={styles.runInfoTitle}>KM/L</Text>
          </View>
          <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
          <Image
          style={{width: 40, height: 40,marginLeft:40}}
          source={require('./carbon.png')}
        />  
             <Text style={styles.runInfoValue}>{parseFloat(co2 / 1000).toFixed(2)}</Text> 
            <Text style={styles.runInfoTitle}>KG</Text>
          </View>
        </View>

          <View style={styles.footer}>
          <View style={{height:80,width:65,backgroundColor:'#6a83fb',alignItems:'center',justifyContent:'center'}}>
      <Text style={{color:'white',fontSize:15, textAlign:'center'}}>Since Start</Text>
      
      </View>
     
      <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
      <Text style={styles.textfooterheader}>Duration</Text>
      <Text style={styles.textfooter}>{this.state.durationtime}</Text>
      </View>
      <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
      <Text style={styles.textfooterheader}>Distance</Text>
      <Text style={styles.textfooter}>{this.state.sum.toFixed(1)} KM</Text>
      </View>
      <View style={{flex:1,flexDirection:'column'}}>
      <Text style={styles.textfooterheader}>Fuel Using</Text>
      <Text style={styles.textfooter}>{parseFloat(totalfueluse[totalfueluse.length - 1]).toFixed(1) } L</Text>
      </View>
     
            </View>


          </View>
          

        <Dialog 
          visible={this.state.dialogVisible}  
          title="Finish"
          titleStyle={{textAlign:'center'}}
          // onTouchOutside={() => this.setState({dialogVisible: false})} 

        >
          <View>
            <Text style={{textAlign:'center'}}>Result</Text>
            <Text>Time:{this.state.timestart} - {this.state.timeend}</Text>
            <Text>Distance: {parseInt(this.state.summarydistance)} KM</Text>
            <Text>CO2: {this.state.summaryco2} KG</Text>
            <Text>Duration: {this.state.durationtime}</Text>
            <Text>Fueluse: {parseFloat(this.state.summaryfueluse).toFixed(1)} L</Text>
            <Text>Fuelrate: {parseInt(this.state.summaryfuelconsumtion)} KM/L</Text>
            <Text>Date: {this.parsedate(this.state.date)}</Text>
            <Text>Source: Unknown</Text>
            <Text>Destination: UnKnown</Text>
      
            <Button title='OK' onPress={()=> this.AddHistory()}/>
          </View>
        </Dialog>

{/*  Modal ถามว่าจะให้เก็บข้อมูลไหม */}

      <Dialog 
          visible={this.state.Modalkeepdata}  
          title="Do you Want to Keep Data?"
          titleStyle={{textAlign:'center'}}
          // onTouchOutside={() => this.setState({dialogVisible: false})} 

        >
          <View>
            <Button title='Yes' onPress={()=>this.setState({Modalkeepdata:false})}/>
          </View>
          <View>
           <Button title='No' onPress={()=>{this.setState({Modalkeepdata:false})
                                            Actions.popTo('home')
          }}/>
         </View>
        </Dialog>
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    width: 240
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  infoText: {
    textAlign: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  containerslideup: {
    // flex: 1,
    // backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  // panelHeader: {
  //   height: 120,
  //   backgroundColor: 'green',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  },
  infoWrapper:{
    position:'absolute',
    left: 0,
    bottom:50,
    right:0,
    flexDirection: 'row',
    flex:1,
    backgroundColor: 'green', 
  },
  runInfoWrapper:{
    // backgroundColor: 'rgba(255,255,255,0.75)',
    paddingVertical: 15,
},
runInfoTitle:{
    textAlign:'center',
    fontWeight:'700',
    color:'white'
},
runInfoValue:{
    textAlign:'center',
    fontSize: 36,
    fontWeight:'300',
    paddingVertical:5,
    color:'white'
},
footer:{
  position: 'absolute',
  flex:0.1,
  left: 0,
  right: 0,
  bottom: -10,
  backgroundColor:'white',
  flexDirection:'row',
  height:60,
  alignItems:'center',
  paddingBottom: 10,
},
textfooterheader:{
  textAlign:'center',
    color:'#6a83fb',
    fontSize:10,
    
},
textfooter:{
  textAlign:'center',
    color:'#6a83fb',
    fontSize:10,
},
zoom:{
  position:'absolute',
    left: 0,
    bottom:195,
    right:0,
    flexDirection: 'row',
    flex:1,
    backgroundColor: 'white', 
    height:30,
},
zoomtext:{
  textAlign:'center',
    color:'#6a83fb',
    fontSize:15,
    fontWeight:'300',
    paddingHorizontal: 5,
}
})