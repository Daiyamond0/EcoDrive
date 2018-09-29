/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
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
      acceleration: []
     
    }
    const {width, height} = Dimensions.get('window');
    this.aspectRatio = width / height;
    this.simulator = new Simulator(this);
    this._renderFavoriteIcon = this._renderFavoriteIcon.bind(this);
    this.ref = firebaseService.database().ref('Speed');
    this.unsubscribe = null;
    this.Timmer = null;
  }

  componentWillMount =()=> {
    this.state.markerPosition = this.props.markerPosition;
    /// /ดึง current location ก่อน render
    // navigator.geolocation.getCurrentPosition(
      
    //   (positions) => {
    //     console.log(positions)
    //     this.setState({
    //       initialPosition: {
    //         latitude: positions.coords.latitude,
    //         longitude: positions.coords.longitude,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421
    //       },
    //       markerPosition: {
    //         latitude: positions.coords.latitude,
    //         longitude: positions.coords.longitude
    //       },
    //       origin: {
    //         latitude: positions.coords.latitude,
    //         longitude: positions.coords.longitude
    //       }
    //     })
    //   },
    //   error => console.log(error),
    //   {enableHighAccuracy: false, timeout: 20000, maximumAge: 500}
      
    // )
    
  }
  shouldComponentUpdate(nextProps, nextState){
    const { speed , sum ,hideinitmarker,stop,query,place ,markerPosition,
      destinationplace,initail,destinate,result,hidebubble,hideway,acceleration,totalfueluse,
      distance,speedId} = this.state

      const {CarSelect ,initialPosition ,origin ,draggableRange} = this.props
    if (speed !== nextState.speed ) {
      return true
    }
    if (sum !== nextState.sum ) {
        return true
      }
      if (hideinitmarker !== nextState.hideinitmarker ) {
        return true
      }
      if (stop !== nextState.stop ) {
        return true
      }
      if (query !== nextState.query ) {
        return true
      }
      if (place !== nextState.place ) {
        return true
      }
      
      if (markerPosition !== nextState.markerPosition ) {
        return true
      }
      if (destinationplace !== nextState.destinationplace ) {
        return true
      }
      if (origin !== nextProps.origin) {
        return true
      }
      if (initail !== nextState.initail ) {
        return true
      }
      if (destinate !== nextState.destinate ) {
        return true
      }
      if (result !== nextState.result  ) {
        return true
      }
      if (hidebubble !== nextState.hidebubble ) {
        return true
      }
      if (hideway !== nextState.hideway ) {
        return true
      }
      if (acceleration !== nextState.acceleration ) {
        return true
      }
      if (CarSelect  !== nextProps.CarSelect.FuelType.CO2Emission ) {
        return true
      }
      if (totalfueluse !== nextState.totalfueluse ) {
        return true
      }
      if (distance !== nextState.distance) {
        return true
      }
      if (initialPosition !== nextProps.initialPosition) {
        return true
      }
      if (draggableRange !== nextProps.draggableRange) {
        return true
      }
      if (speedId !== nextState.speedId) {
        return true
      }
    

    return false
}

  componentDidMount (){
    clearTimeout(this.unsubscribe)
    this.unsubscribe =  setTimeout(()=>this.ref.on('value', this.onCollectionUpdate.bind(this)).bind(this),0.1)
    this.Timmer = TimerMixin.setTimeout(()=>{
      
    },0.1)
   
  
  }
  onCollectionUpdate = (snapshot) => {
    clearTimeout(this.unsubscribe)
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
    
  
    clearTimeout(this.unsubscribe)
    TimerMixin.clearTimeout(this.Timmer)
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

  changeColorPanelHeader(){
    
    const acceleration = this.state.acceleration
    if(acceleration[acceleration.length - 1]< 50){
      
      return{
        height: 120,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
   
     if(acceleration[acceleration.length - 1]>=50 &&acceleration[acceleration.length - 1]<70){
        Vibration.vibrate(2000)
        Vibration.cancel()
      return{
        height: 120,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
      }
    } if(acceleration[acceleration.length - 1] >= 70){
      Vibration.vibrate(2000)
      Vibration.cancel()
      return{
        
        height: 120,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
      }
    } 
  }

  fuelconsumption(){
    const acceleration = this.state.acceleration
    const totalfueluse = this.state.totalfueluse
    const fuelconsumption =
      this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1] 
      if(acceleration[acceleration.length - 1] == null  ){
        return(
         <Text style={styles.runInfoValue}>-</Text>
        
        )
      }
      if(acceleration[acceleration.length - 1]< 50  ){
        return(
         <Text style={styles.runInfoValue}>{Number.parseFloat(fuelconsumption.toFixed(1))}</Text>
        
        )
      }
       if(acceleration[acceleration.length - 1]>=50 &&acceleration[acceleration.length - 1]<70){
        return(
          <Text style={styles.runInfoValue}>{Number.parseFloat(fuelconsumption.toFixed(1),10) +parseInt(10) }</Text>
          
        )
      } if(acceleration[acceleration.length - 1] >= 70){
        return(
          <Text style={styles.runInfoValue}>{Number.parseFloat(fuelconsumption.toFixed(1),10) + parseInt(20)}</Text>
          // <Text>777</Text>
        )
      } 
  }

  

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
  start () {
    const num = this.state.result.Number
    
    this.setState({stop:true})
   var i = 0
   var x = 0
 

   
    
   animationTimeout = setInterval(() => {
      // this.map.animateToViewingAngle(60, 750);
        if (i < this.state.result.way[num].length&&this.state.stop == true) {
          this.setState({
            markerPosition: {
              latitude: this.state.result.way[num][i].latitude,
              longitude: this.state.result.way[num][i].longitude
            }
          })
          
          //  console.log(this.state.markerPosition.latitude.toFixed(4),this.state.markerPosition.longitude.toFixed(4))
          //-------------อย่าลืมแปลง parse เป็น float
          // if(this.state.markerPosition.latitude.toFixed(5) == this.state.result.bearing[num][x].start.latitude.toFixed(5) && this.state.markerPosition.longitude.toFixed(5)==this.state.result.bearing[num][x].start.longitude.toFixed(5)){
          // console.log('555')
          
          //   this.map.animateToBearing(this.state.result.bearing[num][x].bearing);
          //  return x++
          // }
         
         this.map.animateToCoordinate(this.state.markerPosition);
          
          
          // setTimeout(() => this.simulator.start(this.state.result.steps[this.state.result.Number]), 750 * 1.5);
          i++
          
        }
      }, 1000)
      
      
  }
  stop(){
    this.setState({stop:false})
    clearTimeout(animationTimeout);
    
  }
  movelocation (location) {}
  regionchange(region){
    // console.log(region)
  }

  _renderFavoriteIcon() {
    const {top, bottom} = this.props.draggableRange

    const draggedValue = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const transform = [{scale: draggedValue}]
    return (
      <Animated.View style={[styles.favoriteIcon, {transform}]}>
        <Image
          source={require('.././Image/carmap.png')}
          style={{width: 32, height: 32}}
        />
      </Animated.View>
    )
  }

  render () {
   
    console.log(this.props)
    const totalfueluse = this.state.totalfueluse
    const fuelconsumption = this.state.sum.toFixed(1) / totalfueluse[totalfueluse.length - 1]
    const co2 = totalfueluse[totalfueluse.length - 1] * this.props.CarSelect.FuelType.CO2Emission
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
            onReady={result => {
              // console.log(result)
              this.setState({ result: result })
            }}
            onStart={params => {
              // console.log(params);
            }}
            hidebubble={this.state.hidebubble}
            hideway={this.state.hideway}
            reduceArr={this.state.markerPosition}

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
       
        <View style={{ flexDirection: 'row' }}>

          <Button
            title='ZoomIN'
            onPress={() => this.fitBottomMarkers()}
            style={[styles.bubble, styles.button]}
          />
          <Button
            title='ZoomOut'
            onPress={() => this.fitBottomTwoMarkers()}
            style={[styles.bubble, styles.button]}
          />
        </View>
        {this.state.hideinitmarker == false
          ? null
          :<View style={{flexDirection:'row'}}>
          { this.state.stop == false ?
            <View>
            <Button title='Start' onPress={this.start.bind(this)} />
            </View>:
            <View>
            <Button title='Stop' onPress={this.stop.bind(this)} />
            </View>
          }
          <SlidingUpPanel
          visible={true}
          startCollapsed
          showBackdrop={false}
          // ref={c => this._panel = c}
          draggableRange={this.props.draggableRange}
          onDrag={v => this._draggedValue.setValue(v)}
          >
          <View style={styles.panel}>
            {/* {this._renderFavoriteIcon()} */}
            <View style={this.changeColorPanelHeader()}>
              {/* <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text> */}
            
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
             <Text style={styles.runInfoValue}>{parseInt(co2)}</Text> 
            <Text style={styles.runInfoTitle}>G/KM</Text>
          </View>
        </View>
        </View>
            <View style={styles.containerslideup}>
            <Text style={this.changeColor()}>StartMap</Text>
          <Text>CO2Emission: {JSON.stringify(this.props.CarSelect.FuelType.CO2Emission)}</Text>
          <ScrollView>
            {/* <Text>5555</Text> */}
            {/* {this.getDistance()} */}
            {/* <Text>{this.props.speed}</Text> */}
            {/* <Text>{this.state.distance+","}</Text> */}
            <Text>Distance: {this.state.sum.toFixed(1)} KM</Text>
            <Text>FuelUse: {parseInt(totalfueluse[totalfueluse.length - 1])} L</Text>
            {/* <Text>CO2: {co2}</Text> */}
          </ScrollView>
            </View>
          </View>
        </SlidingUpPanel>
          </View>}
          
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
  //   backgroundColor: '#b197fc',
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
    bottom:0,
    right:0,
    flexDirection: 'row',
    flex:1,
    
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
}
})