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
var Sound = require('react-native-sound');
import { Actions } from 'react-native-router-flux'
import firebaseService from '../../enviroments/firebase'

const DEFAULT_PADDING = { top: 500, right:500 , bottom: 500, left: 500 }
let animationTimeout;
const {height} = Dimensions.get('window')
export  class StartMap1 extends Component {
  static defaultProps = {
    draggableRange: {
      top: height / 1.75,
      bottom: 200
    }
  }
  _draggedValue = new Animated.Value(-120)
  constructor (props) {
    super(props)
    
    
    this.state = {
      place: [],
      query: '',
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      destinationplace: {
        latitude: 0,
        longitude: 0
      },
      origin: {
        latitude: 0,
        longitude: 0
      },
      initail: {
        latitude: 0,
        longitude: 0
      },
      destinate: {
        latitude: 0,
        longitude: 0
      },
      result: 0,
      hideinitmarker: false,
      hidebubble: false,
      hideway: false,
      stop:false,

     
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

      orange:true,
      red:true,
      green:true,

      speedavg:0
    }
    const {width, height} = Dimensions.get('window');
    this.aspectRatio = width / height;
    this.simulator = new Simulator(this);
    this.ref = firebaseService.database().ref('Speed');
    this.unsubscribe = null;
    this.intervalId = null;
    this.map = null;
  }

  componentWillMount =()=> {
    
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
  shouldComponentUpdate(nextProps, nextState){
    
    const { speed , sum ,hideinitmarker,stop,query,place ,markerPosition,
      destinationplace,initail,destinate,result,hidebubble,hideway,acceleration,totalfueluse,
      distance,speedId,distancedrive,sumdistance1,i,j,k,sumdistance2,summarydistance
    ,summaryco2,summaryduration,durationtime,summaryfueluse,summaryfuelconsumtion,date
  ,summarysource,summarydestination,dialogVisible} = this.state

      const {carconnect ,initialPosition ,origin ,draggableRange} = this.props

     
    if (this.state.speed !== nextState.speed ) {
      return true
    }
    if (this.state.sum !== nextState.sum ) {
        return true
      }
      if (this.state.hideinitmarker !== nextState.hideinitmarker ) {
        return true
      }
      if (this.state.stop !== nextState.stop ) {
        return true
      }
      if (this.state.query !== nextState.query ) {
        return true
      }
      if (this.state.place !== nextState.place ) {
        return true
      }
      
      if (this.state.markerPosition !== nextState.markerPosition ) {
        return true
      }
      if (this.props.markerPosition !== nextProps.markerPosition ) {
        return true
      }
      if (this.state.destinationplace !== nextState.destinationplace ) {
        return true
      }
      if (this.props.origin !== nextProps.origin) {
        return true
      }
      if (this.state.initail !== nextState.initail ) {
        return true
      }
      if (this.state.destinate !== nextState.destinate ) {
        return true
      }
      if (this.state.result !== nextState.result  ) {
        return true
      }
      if (this.state.hidebubble !== nextState.hidebubble ) {
        return true
      }
      if (this.state.hideway !== nextState.hideway ) {
        return true
      }
      if (this.state.acceleration !== nextState.acceleration ) {
        return true
      }
      if (this.props.carconnect  !== nextProps.carconnect ) {
        return true
      }
      if (this.state.totalfueluse !== nextState.totalfueluse ) {
        return true
      }
      if (this.state.distance !== nextState.distance) {
        return true
      }
      if (this.props.initialPosition !== nextProps.initialPosition) {
        return true
      }
      if (this.props.draggableRange !== nextProps.draggableRange) {
        return true
      }
      if (this.state.speedId !== nextState.speedId) {
        return true
      }
      if (this.state.distancedrive !== nextState.distancedrive) {
        return true
      }
      if (this.state.sumdistance1 !== nextState.sumdistance1) {
        return true
      }
      if (this.state.sumdistance2 !== nextState.sumdistance2) {
        return true
      }
      if (this.state.i !== nextState.i) {
        return true
      }
      if (this.state.j !== nextState.j) {
        return true
      }
      if (this.state.k !== nextState.k) {
        return true
      }
      if (this.state.summarydistancek !== nextState.summarydistance) {
        return true
      }
      if (this.state.summaryco2 !== nextState.summaryco2) {
        
        return true
      }
      if (this.state.durationtime !== nextState.durationtime) {
        return true
      }
      if (this.state.summaryfueluse !== nextState.summaryfueluse) {
        return true
      }
      if (this.state.summaryfuelconsumtion !== nextState.summaryfuelconsumtion) {
        return true
      }
      if (this.state.date !== nextState.date) {
        return true
      }
      if (this.state.summarysource !== nextState.summarysource) {
        return true
      }
      if (this.state.summarydestination !== nextState.summarydestination) {
        return true
      }
      if (this.state.dialogVisible !== nextState.dialogVisible) {
        return true
      }
    
    return false
}

  componentDidMount (){
    
    this.unsubscribe = this.ref.on('value', this.onCollectionUpdate)
    
   

 
this.intervalId = setInterval(()=>{ 
  
  var totalfueluse = this.state.totalfueluse //

  var num = this.state.result.Number
  var distance = Number.parseFloat(this.state.sum);
  var co2 =((100 / this.props.carconnect.FuelConsumption) * this.props.carconnect.FuelType.CO2Emission) * Number.parseFloat(this.state.sum.toFixed(2))
  if( distance > this.state.sumdistance1 && this.state.i < this.state.result.way[num].length ){
    if(this.state.i == 2){
      var d = new Date()
      this.setState({timestart:d.getHours()+':'+d.getMinutes()})
    }
    this.setState({
          markerPosition: {
            latitude: this.state.result.way[num][this.state.i].latitude,
            longitude: this.state.result.way[num][this.state.i].longitude
          }
        })
        
    this.setState({sumdistance1: this.state.sumdistance1 + parseFloat(this.state.distancedrive[this.state.j])   })
    this.setState({sumdistance2: this.state.sumdistance2 + parseFloat(this.state.distancedrive[this.state.k])   })
    this.setState({i:this.state.i +1 })
    this.setState({j:this.state.j +1 })
    this.setState({k:this.state.k +1 })
    
    
    this.setState({
      fuelraterealtime: [...this.state.fuelraterealtime,this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1]]
    })
   
    
    
   if(this.state.i == this.state.result.way[num].length -1){
var d = new Date()
      clearInterval(this.intervalId)
      clearInterval(this.durationtime)
      this.setState({summarydistance:distance}) 
      this.setState({summaryco2:parseFloat(co2 / 1000).toFixed(2)})
      this.setState({summaryduration:this.state.durationtime})
      this.setState({summaryfueluse:this.state.totalfueluse[this.state.totalfueluse.length - 1]})
      this.setState({summaryfuelconsumtion:this.state.sum.toFixed(1) / this.state.totalfueluse[this.state.totalfueluse.length - 1]})
      // this.setState({date:date.toLocaleDateString()})
      this.setState({dialogVisible:true})
      this.setState({timeend:d.getHours()+':'+d.getMinutes()})
      this.ref.off()

   }
    // this.map.animateToCoordinate(this.state.markerPosition);
  }
  },100)


var totalSeconds = 0;
this.durationtime = setInterval(()=>{
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
  this.setState({durationtime: hour + ":" + minute + ":" + seconds })}},1000)



  /////////////////////////////////////////////////
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
    
    
    
    
    
   // this.setState({co2:[...this.state.co2,100/(this.state.sum.toFixed(1) / this.state.totalfueluse[this.state.totalfueluse.length - 1])]})
  }

  componentWillUnmount() {
    this.unsubscribe = null
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
     if( fuelconsumption < this.props.carconnect.FuelConsumption- (this.props.carconnect.FuelConsumption * 0.2) && fuelconsumption > this.props.carconnect.FuelConsumption - (this.props.carconnect.FuelConsumption * 0.25)){
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
      }if(fuelconsumption < this.props.carconnect.FuelConsumption - (this.props.carconnect.FuelConsumption * 0.25)){
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
        bottom:50,
        right:0,
        flexDirection: 'row',
        flex:1,
        backgroundColor: 'green'
    }
     
  }

  // fuelconsumption(){
    
  //   const acceleration = this.state.acceleration
  //   const totalfueluse = this.state.totalfueluse
  //   const fuelconsumption = this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1] 
      
  //     if(acceleration[acceleration.length - 1] == null  ){
  //       return(
  //        <Text style={styles.runInfoValue}>-</Text>
        
  //       )
  //     }
  //     if(acceleration[acceleration.length - 1]< 50  ){
          
  //       return(
         
  //        <Text style={styles.runInfoValue}>{Number.parseFloat(fuelconsumption.toFixed(1))}</Text>
        
  //       )
  //     }
  //      if(acceleration[acceleration.length - 1]>=50 &&acceleration[acceleration.length - 1]<70){
       
  //       return(
  //         <Text style={styles.runInfoValue}>{Number.parseFloat(fuelconsumption.toFixed(1),10) +parseInt(10) }</Text>
          
  //       )
  //     } if(acceleration[acceleration.length - 1] >= 70){
   
  //       return(
  //         <Text style={styles.runInfoValue}>{Number.parseFloat(fuelconsumption.toFixed(1),10) + parseInt(20)}</Text>
  //         // <Text>777</Text>
  //       )
  //     }
      
  // }

  

  /// /////////////////////ค้นหาสถานที่ที่กรอกเข้ามา
  FindPlace (text) {
    this.setState({ query: text })
    if (text == '') {
      this.setState({
        destinationplace: {
          latitude: 0,
          longitude: 0
        }
      })
    }
    RNGooglePlaces.getAutocompletePredictions(text, {
      type: 'geocode',
      country: 'TH'
    })
      .then(place => {
        this.setState({ place: place })
      })
      .catch(error => console.log(error.message))
  }

  SelectPlace (item) {
    this.setState({ query: Object.values(item)[3] })
    /// // เอา id ของสถานที่ที่เลือกมาหา lat , long
    RNGooglePlaces.lookUpPlaceByID(item.placeID)
      .then(results =>
        this.setState({
          destinationplace: {
            latitude: results.latitude,
            longitude: results.longitude
          }
        })
        
      )
      .catch(error => console.log(error.message))
  }

  Direction () {
    this.setState({ initail: this.props.origin })
    this.setState({ destinate: this.state.destinationplace })
  }
  fitBottomMarkers () {
    const region = {
      ...this.state.markerPosition,
      latitudeDelta: 0.006760843098163605,
      longitudeDelta: 0.011241360405390921
  };

  this.map.animateToRegion(region,750);
    this.setState({ hideinitmarker: true })
    this.setState({ hidebubble: true })
    this.setState({ hideway: true })
    this.convertlatlongtodistance(this.state.result.way,this.state.result.Number)
    
    Geocoder.setApiKey('AIzaSyCIDhCTooCtG9yU4vGws43l51z-RPobgm0');
    Geocoder.getFromLatLng(this.props.initialPosition.latitude,this.props.initialPosition.longitude)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0].short_name;
			this.setState({summarysource:addressComponent})
		})
		.catch(error => console.warn(error));
    Geocoder.getFromLatLng(this.state.destinationplace.latitude,this.state.destinationplace.longitude)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0].short_name;
      this.setState({summarydestination:addressComponent})
      console.log(this.state.summarydestination)
		})
		.catch(error => console.warn(error));
   
    
  }
  fitBottomTwoMarkers () {
    this.setState({ hideinitmarker: false })
    this.map.fitToCoordinates(
      [this.state.markerPosition, this.state.destinate],
      {
        // edgePadding: DEFAULT_PADDING,
        animated: true
      }
    )
    this.setState({ hidebubble: false })
    this.setState({ hideway: false })

  }
  getZoomValue(level) {
    const value = 0.00001 * (21- (level <5 ? 5 : level));

    return {
        latitudeDelta: value,
        longitudeDelta: value * this.aspectRatio
    }
}
  // start () {
  //   const num = this.state.result.Number
    
  //   this.setState({stop:true})
  //  var i = 0
  //  var x = 0
 
  //  animationTimeout = setInterval(() => {
  //     // this.map.animateToViewingAngle(60, 750);
  //       if (i < this.state.result.way[num].length&&this.state.stop == true) {
  //         this.setState({
  //           markerPosition: {
  //             latitude: this.state.result.way[num][i].latitude,
  //             longitude: this.state.result.way[num][i].longitude
  //           }
  //         })
  //         //  console.log(this.state.markerPosition.latitude.toFixed(4),this.state.markerPosition.longitude.toFixed(4))
  //         //-------------อย่าลืมแปลง parse เป็น float
  //         // if(this.state.markerPosition.latitude.toFixed(5) == this.state.result.bearing[num][x].start.latitude.toFixed(5) && this.state.markerPosition.longitude.toFixed(5)==this.state.result.bearing[num][x].start.longitude.toFixed(5)){
  //         // console.log('555')
          
  //         //   this.map.animateToBearing(this.state.result.bearing[num][x].bearing);
  //         //  return x++
  //         // }
         
  //        this.map.animateToCoordinate(this.state.markerPosition);
          
          
  //         // setTimeout(() => this.simulator.start(this.state.result.steps[this.state.result.Number]), 750 * 1.5);
  //         i++
          
  //       }
  //     }, 1000)
      
      
  // }
  // stop(){
  //   this.setState({stop:false})
  //   clearTimeout(animationTimeout);
    
  // }
  movelocation (location) {}
  regionchange(region){
    // console.log(region)
  }

  convertlatlongtodistance(way,number){
    console.log(way[number])
    var Distance = []
    var i = 0;
    var j = 1;

    for( i,j ; i < way[number].length -1 && j <way[number].length ; i++,j++){
    var radlat1 = Math.PI * way[number][i].latitude/180
	  var radlat2 = Math.PI * way[number][j].latitude/180
	  var theta = way[number][i].longitude - way[number][j].longitude
	  var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	    if (dist > 1) {
		    dist = 1;
    	}
  	dist = Math.acos(dist)
  	dist = dist * 180/Math.PI
	  dist = dist * 60 * 1.1515 * 1.609344
    Distance.push(parseFloat(dist))
    this.setState({distancedrive:Distance})
   this.setState({sumdistance1:parseFloat(Distance[0])})
   this.setState({sumdistance2:parseFloat(Distance[0]) + parseFloat(Distance[1])})
  //  console.log(this.state.distancedrive)
    }
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
            Source: this.state.summarysource,
            Destination: this.state.query,
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

  render () {
    
  console.log(this.props.carconnect)
    
    const totalfueluse = this.state.totalfueluse
    const fuelconsumption = this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1]
    // const co2 = totalfueluse[totalfueluse.length - 1] * this.props.carconnect.FuelType.CO2Emission
    const co2 =((100 / this.props.carconnect.FuelConsumption) * this.props.carconnect.FuelType.CO2Emission) * Number.parseFloat(this.state.sum.toFixed(2))
    const acceleration = this.state.acceleration
    
    const data = this.state.place
    const place = []
    const x = Object.values(this.state.place).forEach(function (value) {
      place.push(Object.values(value)[3])
    })
    const currentlocation = this.props.initialPosition
    const origin = this.state.initail
    const destination = this.state.destinate
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCIDhCTooCtG9yU4vGws43l51z-RPobgm0'
    const pic = '.././Image/carmap.png'
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => {
            this.map = ref
            
          }}
          // showsMyLocationButton={false}
          // showsUserLocation
          initialRegion={currentlocation}
          mapType='standard'
          onUserLocationChange={location => this.movelocation(location)}
          onRegionChange={region => this.regionchange(region)}
        >
          {this.state.hideinitmarker == false
            ? <Marker coordinate={this.state.markerPosition} />
            : <Marker 
              coordinate={this.state.markerPosition}
              image={require(pic)}
              />}
          <Marker coordinate={destination} />

          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={10}
            // strokeColor='hotpink'
            alternatives
            onReady={ result => {
              // console.log(result)
              this.setState({ result: result })
              // this.convertlatlongtodistance(result.way,result.Number)
            }}
            onStart={params => {
              // console.log(params);
            }}
            hidebubble={this.state.hidebubble}
            hideway={this.state.hideway}
            reduceArr={this.state.markerPosition}
            co2={this.props.carconnect.FuelType.CO2Emission}
            fuelconsumption={this.props.carconnect.FuelConsumption}
          />
        </MapView>
        {this.state.hideinitmarker == false ?
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>

          <Autocomplete
            autoCapitalize='none'
            autoCorrect={false}
            data={
              data.length >= 0 && place.includes(this.state.query) == true
                ? []
                : data
            }
            containerStyle={styles.autocompleteContainer}
            defaultValue={this.state.query}
            onChangeText={text => this.FindPlace(text)}
            placeholder='Enter Place'
            renderItem={item => (
              <TouchableOpacity onPress={() => this.SelectPlace(item)}>
                <Text style={styles.itemText}>{Object.values(item)[3]} </Text>
                <Text style={styles.itemText}>{Object.values(item)[2]} </Text>
                <Text style={styles.itemText} />
              </TouchableOpacity>
            )}
          />

          <View style={{ width: 50, left: 100 }}>
            <Button title='Go' onPress={this.Direction.bind(this)} />
          </View>
        </View>
        :null
        }
       
        
  { this.state.destinate.latitude != 0 && this.state.destinate.longitude != 0 && this.state.hideinitmarker == false
  ? 
  <View style={{ flexDirection: 'row' }}>
  <Button
            title='ZoomIN'
            onPress={() => this.fitBottomMarkers()}
            style={[styles.bubble, styles.button]}
          />
          {/* <Button
            title='ZoomOut'
            onPress={() => this.fitBottomTwoMarkers()}
            style={[styles.bubble, styles.button]}
          /> */}
        </View>
   :null
   }
          
        {this.state.hideinitmarker == false
          ? null
          :<View style={{flexDirection:'row',flex:1}}>


<View style={styles.zoom}>
<View style={{flex:1,flexDirection:'column',borderColor:'#6a83fb', borderWidth: 2,}}>
<TouchableOpacity onPress={() => this.fitBottomTwoMarkers()}>
  <Text style={styles.zoomtext}>- ZOOMOUT</Text>
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






          {/* { this.state.stop == false ?
            <View>
            <Button title='Start' onPress={this.start.bind(this)} />
            </View>:
            <View>
            <Button title='Stop' onPress={this.stop.bind(this)} />
            </View>
          } */}
          {/* <SlidingUpPanel
          visible={true}
          startCollapsed
          showBackdrop={false}
          ref={c => this._panel = c}
          draggableRange={this.props.draggableRange}
          onDrag={v => this._draggedValue.setValue(v)}
          allowMomentum
          > */}
          {/* <View style={styles.panel}>
           
            <View style={[this.changeColorPanelHeader()]}>
              
            
          <View style={styles.infoWrapper}>
          <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
            <Text style={styles.runInfoTitle}>Accerelator</Text>
           {acceleration[acceleration.length - 1] != null ? <Text style={styles.runInfoValue}>{acceleration[acceleration.length - 1]}</Text> :<Text style={styles.runInfoValue}>-</Text> }
            <Text style={styles.runInfoTitle}>%</Text>
          </View>
          <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
            <Text style={styles.runInfoTitle}>Fuelrate</Text>
            {this.fuelconsumption()}
            <Text style={styles.runInfoTitle}>KM/L</Text>
          </View>
          <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
            <Text style={styles.runInfoTitle}>CO2</Text>
             <Text style={styles.runInfoValue}>{parseFloat(co2 / 1000).toFixed(2)}</Text> 
            <Text style={styles.runInfoTitle}>KG</Text>
          </View>
        </View>
        </View>
            <View style={styles.containerslideup}>
            <Text style={this.changeColor()}>StartMap</Text>
          
          <ScrollView>
            <Text>Date: {this.parsedate(this.state.date)} </Text>
            <Text>Time: {this.state.durationtime}</Text>
            <Text>Distance: {this.state.sum.toFixed(1)} KM</Text>
            <Text>FuelUse: {parseInt(totalfueluse[totalfueluse.length - 1])} L</Text> */}
            {/* <Text>CO2Emission: {JSON.stringify(this.props.carconnect.FuelType.CO2Emission)}</Text> */}
            {/* {this.getDistance()} */}
            {/* <Text>{this.props.speed}</Text> */}
            {/* <Text>{this.state.distance+","}</Text> */}
            {/* <Text>CO2: {co2}</Text> */}
          {/* </ScrollView>
            </View>
          </View> */}
        {/* </SlidingUpPanel> */}
          </View>
          }

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
            <Text>Source: {this.state.summarysource}</Text>
            <Text>Destination: {this.state.query}</Text>
            <Text>speedavg: {(this.state.speedavg/this.state.distance.length).toFixed(1)} KM/H</Text>
      
            <Button title='OK' onPress={()=> this.AddHistory()}/>
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