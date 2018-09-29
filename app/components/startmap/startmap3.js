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
  ScrollView
} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import RNGooglePlaces from 'react-native-google-places'
import MapViewDirections from 'react-native-maps-directions'
import Autocomplete from 'react-native-autocomplete-input'
import Simulator from '../../../modules/Simulator';
// import SlidingUpPanel from 'rn-sliding-up-panel'
import SlidingPanel from 'react-native-sliding-up-down-panels';

import firebaseService from '../../enviroments/firebase'

const DEFAULT_PADDING = { top: 500, right:500 , bottom: 500, left: 500 }
let animationTimeout;
const { width, height } = Dimensions.get('window');

export  class StartMap3 extends Component {
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

      loading: true,
      speed: [],
      distance: [],
      sum: 0,
      totalfueluse: [],
      co2: [],
      acceleration: []
     
    }
    const {width, height} = Dimensions.get('window');
    this.aspectRatio = width / height;
    this.simulator = new Simulator(this);
    this.ref = firebaseService.database().ref('Speed');
    this.unsubscribe = null;
  }

  componentWillMount =()=> {
    this.state.markerPosition = this.props.markerPosition;
    
  }
  shouldComponentUpdate(nextProps, nextState){
    const { speed , sum} = this.state
    if (speed !== nextState.speed ) {
      return true
    }
    if (sum !== nextState.sum ) {
        return true
      }
    return false
}
  componentDidMount =()=> {
   
    this.unsubscribe = this.ref.on('value', this.onCollectionUpdate.bind(this))
  }
  onCollectionUpdate = snapshot => {
    var speed = []
    snapshot.forEach(
      function (childSnapshot) {
        var childData = childSnapshot.val()
        speed.push(childData)
        
      }
    )
    this.setState({
      speed
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
    
  }

  componentWillUnmount =()=> {
    this.unsubscribe  = null
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
 
  //  const region = {
  //       ...this.state.markerPosition,
  //       ...this.getZoomValue(14),
  //   };
  //   this.map.animateToRegion(region,750);
    // console.log((this.state.result.bearing[2][2].bearing))
    // console.log(this.state.result.bearing[num][x].start.latitude.toFixed(4))
    // console.log(this.state.result.bearing[num][x].start.longitude.toFixed(4))
   
    
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



  render () {
  
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
    console.log(currentlocation)
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
  title='Focus'
  onPress={() => this.fitBottomMarkers()}
  style={[styles.bubble, styles.button]}
/>
<Button
  title='CancelFocus'
  onPress={() => this.fitBottomTwoMarkers()}
  style={[styles.bubble, styles.button]}
/>
</View>

      
        
        <SlidingPanel
        
            headerLayoutHeight = {100}
            headerLayout = { () =>
                <View style={styles.headerLayoutStyle}>
                   <View style={styles.infoWrapper}>
          <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
            <Text style={styles.runInfoTitle}>accerelations</Text>
           {acceleration[acceleration.length - 1] != null ? <Text style={styles.runInfoValue}>{acceleration[acceleration.length - 1]}</Text> :<Text style={styles.runInfoValue}>-</Text> }
            <Text style={styles.runInfoTitle}>%</Text>
          </View>
          <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
            <Text style={styles.runInfoTitle}>Fuelrate</Text>
            {this.fuelconsumption()}
            <Text style={styles.runInfoTitle}>Km/L</Text>
          </View>
          <View style={[styles.runInfoWrapper,{flex:1,flexDirection:'column'}]}>
            <Text style={styles.runInfoTitle}>CO2</Text>
             <Text style={styles.runInfoValue}>{parseInt(co2)}</Text> 
            <Text style={styles.runInfoTitle}>G/KM</Text>
          </View>
        </View>
                </View>
            }
            
            slidingPanelLayout = { () =>
                <View style={styles.slidingPanelLayoutStyle}>
                  <Text style={this.changeColor()}>StartMap</Text>
          <Text>CO2Emission: {JSON.stringify(this.props.CarSelect.FuelType.CO2Emission)}</Text>
          <ScrollView>
           
            <Text>Distance: {this.state.sum.toFixed(1) + ','}</Text>
            <Text>FuelUse: {totalfueluse[totalfueluse.length - 1]}</Text>
            <Text>CO2: {co2}</Text>
          </ScrollView>
                </View>
            }
        />
       
       

      
          
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
    color:'#666'
},
runInfoValue:{
    textAlign:'center',
    fontSize: 24,
    fontWeight:'200',
    paddingVertical:5,
},
bodyViewStyle: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  headerLayoutStyle: {
    width, 
    height: 100, 
    backgroundColor: 'orange', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  slidingPanelLayoutStyle: {
    width, 
    height , 
    backgroundColor: '#7E52A0', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative'
  },
  commonTextStyle: {
    color: 'white', 
    fontSize: 18,
  },
})