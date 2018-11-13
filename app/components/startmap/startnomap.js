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
var Sound = require('react-native-sound');

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

      Modalkeepdata:false,

      orange:true,
      red:true,
      green:true,

      speedavg:0
    }
   
   
    this.ref = firebaseService.database().ref('Speed');
    this.unsubscribe = null;
    this.intervalId = null;
    
  }
  shouldComponentUpdate(nextProps, nextState){
    const { speed,distance,sum, totalfueluse,speedId,acceleration,distancedrive, intervalId,sumdistance1,sumdistance2,
      summarydistance,summaryco2,summaryduration,durationtime,summaryfueluse,summaryfuelconsumtion, date,
      summarysource,summarydestination,dialogVisible,timestart,timeend,fuelraterealtime,historylength,
      Modalkeepdata,orange,red,green,speedavg} = this.state
    if (this.state.speed !== nextState.speed ) {
      return true
    }
    if (this.state.speed !== nextState.speed ) {
      return true
    }
    if (this.state.distance !== nextState.distance ) {
      return true
    }
    if (this.state.sum !== nextState.sum ) {
      return true
    }
    if (this.state.totalfueluse !== nextState.totalfueluse ) {
      return true
    }
    if (this.state.speedId !== nextState.speedId ) {
      return true
    }
    if (this.state.acceleration !== nextState.acceleration ) {
      return true
    }
    if (this.state.distancedrive !== nextState.distancedrive ) {
      return true
    }
    if (this.state.intervalId !== nextState.intervalId ) {
      return true
    }
    if (this.state.sumdistance1 !== nextState.sumdistance1 ) {
      return true
    }
    if (this.state.sumdistance2 !== nextState.sumdistance2 ) {
      return true
    }
    if (this.state.summarydistance !== nextState.summarydistance ) {
      return true
    }
    if (this.state.summaryco2 !== nextState.summaryco2 ) {
      return true
    }
    if (this.state.summaryduration !== nextState.summaryduration ) {
      return true
    }
    if (this.state.durationtime !== nextState.durationtime ) {
      return true
    }
    if (this.state.summaryfueluse !== nextState.summaryfueluse ) {
      return true
    }
    if (this.state.summaryfuelconsumtion !== nextState.summaryfuelconsumtion ) {
      return true
    }
    if (this.state.date !== nextState.date ) {
      return true
    }
    if (this.state.summarysource !== nextState.summarysource ) {
      return true
    }
    if (this.state.summarydestination !== nextState.summarydestination ) {
      return true
    }
    if (this.state.dialogVisible !== nextState.dialogVisible ) {
      return true
    }
    if (this.state.timestart !== nextState.timestart ) {
      return true
    }
    if (this.state.timeend !== nextState.timeend ) {
      return true
    }
    if (this.state.fuelraterealtime !== nextState.fuelraterealtime ) {
      return true
    }
    if (this.state.historylength !== nextState.historylength ) {
      return true
    }
    if (this.state.Modalkeepdata !== nextState.Modalkeepdata ) {
      return true
    }
    if (this.state.orange !== nextState.orange ) {
      return true
    }
    if (this.state.red !== nextState.red ) {
      return true
    }
    if (this.state.green !== nextState.green ) {
      return true
    }
    if (this.state.speedavg !== nextState.speedavg ) {
      return true
    }
    return false
}

  componentWillMount =()=> {
    

    var d = new Date()
    var hr = d.getHours()
    var min = d.getMinutes()
    if(min<10) {
      min='0'+min;
    } 
    this.setState({timestart:hr+':'+min})

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
            this.setState({historylength:history.length + 1})
        }.bind(this))
        
      }.bind(this),
      function (error) {
        console.log(error)
      }
    )
    
  

  }
  

  componentDidMount (){
      if(this.props.popup == true){
      this.setState({Modalkeepdata:true})
    }else{
      this.setState({Modalkeepdata:false})
    }
    this.unsubscribe = this.ref.on('value', this.onCollectionUpdate.bind(this))
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
  if(this.state.sum > 0.1){
  this.setState({
    fuelraterealtime: [...this.state.fuelraterealtime,this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1]]
  })
}
   
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
    var speedavg = 0
    const numbers = this.state.distance
    for (const i = 0; i < numbers.length; i++) {
      sum += Number.parseFloat(numbers[i], 10)
      speedavg += Number.parseFloat(numbers[i], 10)
    }
    this.setState({
      sum: sum / 1000
    })
    this.setState({
      speedavg: speedavg 
    })
   
    
    
    /////////////////////////////////////////////////////////////////////////////////
    
    

   this.noti= setInterval(()=>{
    const totalfueluse = this.state.totalfueluse
    const fuelconsumption = this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1] 
    const acceleration = this.state.acceleration
    if( fuelconsumption < (this.props.carconnect.FuelConsumption- (this.props.carconnect.FuelConsumption * 0.2)) -0.5 && fuelconsumption > this.props.carconnect.FuelConsumption - (this.props.carconnect.FuelConsumption * 0.25)){
      this.setState({red:true})
      this.setState({green:true})
      if(this.state.orange == true){
        this.setState({orange:false})
          Vibration.vibrate(2000) 
          var whoosh = new Sound('orange.mp3', Sound.MAIN_BUNDLE,()=>{
             whoosh.play()
          })
          
          
        }
    }if(fuelconsumption  < (this.props.carconnect.FuelConsumption - (this.props.carconnect.FuelConsumption * 0.25)) -0.5 && fuelconsumption > 0){
      this.setState({orange:true})
      if(this.state.red == true){
        this.setState({red:false})
          Vibration.vibrate(2000) 
          var whoosh = new Sound('red.mp3', Sound.MAIN_BUNDLE,()=>{
            whoosh.play()
        })
        }

    } if( fuelconsumption > (this.props.carconnect.FuelConsumption- (this.props.carconnect.FuelConsumption * 0.2)) ){
     this.setState({orange:true})
      if(this.state.green == true){
        
        this.setState({green:false})
          var whoosh = new Sound('green.mp3', Sound.MAIN_BUNDLE,()=>{
            whoosh.play()
        })
        }
    }
    },2000)

    
    
          

  }

  componentWillUnmount() {
    // this.unsubscribe = null
    clearInterval(this.intervalId)
    clearInterval(this.durationtime)
    this.unsubscribe = null;
    this.intervalId = null;
    this.ref = null
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
    
     if( fuelconsumption < this.props.carconnect.FuelConsumption- (this.props.carconnect.FuelConsumption * 0.2) && fuelconsumption > this.props.carconnect.FuelConsumption - (this.props.carconnect.FuelConsumption * 0.25)){
      
      
      return{
        position:'absolute',
        left: 0,
        bottom:0,
        right:0,
        flexDirection: 'row',
        flex:1,
        backgroundColor: 'orange'
      }
      }if(fuelconsumption < this.props.carconnect.FuelConsumption - (this.props.carconnect.FuelConsumption * 0.25) && fuelconsumption > 0){
      // Vibration.vibrate(2000)
      // Vibration.cancel()
      return{
        position:'absolute',
        left: 0,
        bottom:0,
        right:0,
        flexDirection: 'row',
        flex:1,
        backgroundColor: 'red',
      }
    } 
    //   if(acceleration[acceleration.length - 1]>=50 &&acceleration[acceleration.length - 1]<70){
    //    return{
    //     position:'absolute',
    //     left: 0,
    //     bottom:50,
    //     right:0,
    //     flexDirection: 'row',
    //     flex:1,
    //     backgroundColor: 'orange'
    //   }
    // } if(acceleration[acceleration.length - 1] >= 70){
    //     return{
    //     position:'absolute',
    //     left: 0,
    //     bottom:50,
    //     right:0,
    //     flexDirection: 'row',
    //     flex:1,
    //     backgroundColor: 'red',
    //   }
    // }
          
        return {
        position:'absolute',
        left: 0,
        bottom:0,
        right:0,
        flexDirection: 'row',
        flex:1,
        backgroundColor: 'green'
    
  }
     
  }

  
 SaveTrip(){
  var d = new Date()
  var min = d.getMinutes()
  if(min<10) {
    min='0'+min;
  } 
  this.setState({timeend:d.getHours()+':'+min})
  this.setState({dialogVisible: true})
  clearInterval(this.durationtime)
  this.ref.off()
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
            Source: 'Unspecified',
            Destination: 'Unspecified',
            Time:this.state.timestart,
            Timeend:this.state.timeend,
            fuelraterealtime:this.state.fuelraterealtime,
            speedavg: (this.state.speedavg/this.state.distance.length).toFixed(1)
     })
    Actions.popTo('home')
  }
  parsedate(date){
    
    var d = new Date(date)
    return (
      <Text>{d.toDateString()}</Text>
    )
  }
  Startmap(){
    
    Actions.replace('startmap')
    this.ref.off()
  }
 
  render () {
// console.log(this.state.speedavg/this.state.distance.length)
    // console.log(this.props.carconnect)
    const totalfueluse = this.state.totalfueluse
    const fuelconsumption = this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1]
    // const co2 = totalfueluse[totalfueluse.length - 1] * this.props.carconnect.FuelType.CO2Emission
    const co2 =((100 / this.props.carconnect.FuelConsumption) * this.props.carconnect.FuelType.CO2Emission) * Number.parseFloat(this.state.sum.toFixed(2))
    const acceleration = this.state.acceleration
    
  
   
    const pic = '.././Image/carmap.png'
    return (
      <View style={styles.container}>
      <View style={{marginTop:60,width:310,height:230,alignSelf:'center',borderColor:'#ffb3cc',borderWidth:0.5,borderRadius:8,backgroundColor:'white'}}>
<View style={{flexDirection:'row',marginTop:60}}>
<Text style={styles.box}>Date</Text>
<Text style={{marginLeft:92,color:'#6a83fb'}}>{this.parsedate(this.state.date)}</Text>
</View>
<View style={{flexDirection:'row',marginTop:10}}>
<Text style={styles.box}>Start Time</Text>
<Text style={{marginLeft:56,color:'#6a83fb'}}>{this.state.timestart}</Text>
</View>
<View style={{flexDirection:'row',marginTop:10}}>
<Text style={styles.box}>End Time</Text>
<Text style={{marginLeft:62,color:'#6a83fb'}}>Still driving</Text>
</View>
<View style={{flexDirection:'row',marginTop:10}}>
<Text style={styles.box}>Duration</Text>
<Text style={{marginLeft:70,color:'#6a83fb'}}>{this.state.durationtime} (still counting)</Text>
</View>
<View style={{flexDirection:'row',marginTop:10}}>
<Text style={styles.box}>FuelConsumption Standard</Text>
<Text style={{marginLeft:40,color:'#6a83fb'}}>{this.props.carconnect.FuelConsumption} KM/L</Text>
</View>
<View style={{flexDirection:'row',marginTop:10}}>
<Text style={styles.box}>Speed</Text>
{this.state.distance.length == 0
  ? <Text style={{marginLeft:85,color:'#6a83fb'}}>- KM/H</Text>  
  : <Text style={{marginLeft:85,color:'#6a83fb'}}>{this.state.distance[this.state.distance.length -1]} KM/H</Text>}

</View>
</View>
        <View style={styles.headerbox}>
<Text style={{color:'white',fontSize:20,marginBottom:5}}>{this.props.carconnect.Make + ' '+this.props.carconnect.Model}</Text>
<Text style={{color:'white',fontSize:15}}>This trip is automatically starts</Text>
</View>          
<View style={{flexDirection:'row',flex:1,marginTop:35}}>
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
      <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
      <Text style={styles.textfooterheader}>Fuel Using</Text>
      <Text style={styles.textfooter}>{parseFloat(totalfueluse[totalfueluse.length - 1]).toFixed(1) } L</Text>
      </View>
</View>
      <View style={{flexDirection:'row',flex:1}}>
<View style={styles.zoom}>
<View>
  <Button title='SaveTrips' onPress={()=>this.SaveTrip()}/>
  </View>
<View style={{flex:1,flexDirection:'column',borderColor:'#6a83fb', borderWidth: 2,}}>
<TouchableOpacity onPress={()=>this.Startmap()}>
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

          {/* <View style={styles.footer}>
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
     
            </View> */}


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
            <Text>Source: Unspecified</Text>
            <Text>Destination: Unspecified</Text>
            <Text>speedavg: {(this.state.speedavg/this.state.distance.length).toFixed(1)} KM/H</Text>
      
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
                                            Actions.pop()
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
    bottom:145,
    right:0,
    flexDirection: 'row',
    flex:1,
    backgroundColor: 'white', 
    height:40,
},
zoomtext:{
  textAlign:'center',
    color:'#6a83fb',
    fontSize:15,
    fontWeight:'300',
    paddingHorizontal: 5,
    
},
headerbox:{
  position:'absolute',
  marginBottom:30,
  height:95,
  justifyContent:'center',
  backgroundColor:'#6a83fb',
  alignItems:'center',
  alignSelf:'center',
  width:230,
  borderBottomLeftRadius:15,
  borderBottomRightRadius:15
  },
  box:{
    marginLeft:25,
    color:'#6a83fb'
  },
})