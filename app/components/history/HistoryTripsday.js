import React, { Component } from 'react'
import { Text, View ,ScrollView,Image,StyleSheet} from 'react-native'
import { Container, Header, Content, Tab, Tabs ,Picker,List,ListItem ,Card, CardItem,} from 'native-base';
import { LineChart, XAxis, Grid ,YAxis,AreaChart,} from 'react-native-svg-charts'
import firebaseService from '../../enviroments/firebase'
import * as shape from 'd3-shape'
import Svg,{Line} from 'react-native-svg'
let date = new Date();

export  class HistoryTripsday extends Component {
    constructor (props) {
        super(props)
        this.state = {
            historytrip:[],
            date:[],
            sumDistance : [],
            sumFueluse : [],
            avgCo2 :[],
            avgfuelrate : [],
            avgspeed: [],
            Co2 :0,
            fuelrate : 0,
            speed: 0,
            lengthCo2 :0,
            lengthfuelrate : 0,
            lengthspeed: 0,
        }
      }

componentWillMount(){
    const uid = this.props.user.uid
    var history = []
    this.history = firebaseService.database().ref(`History/${uid}/`).once(
      'value',
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            const his = childSnapshot.val()
            history.push(his)
            this.setState({historytrip:history})
            
                if(!this.state.date.includes(his.Date)   ) {
                    
                        this.setState({date:[...this.state.date,his.Date]})
                    
                    if(his.Date == date.toLocaleDateString() && !this.state.date.includes('Today')){
                        this.setState({date:[...this.state.date,'Today']})
                    } 

            
        }
        }.bind(this))
        
      }.bind(this),
      function (error) {
        console.log(error)
      }
    )
   
    ////////////////////////////////////////////////////
    var sumDistance = []
    var sumFueluse = []
    var avgCo2 =[]
    var avgfuelrate = []
    var avgspeed = []
    
    this.history2 = firebaseService.database().ref(`History/${uid}/`).once(
        'value',
        function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
              const car = childSnapshot.val()
              if((this.props.trips.Car.Make +' '+ this.props.trips.Car.Model).includes(car.Car.Make +' '+ car.Car.Model)){
                sumDistance.push(car.Distance)
                sumFueluse.push(parseFloat(car.Fueluse))
                avgCo2.push(parseFloat(car.CO2))
                avgfuelrate.push(car.Fuelrate)
                avgspeed.push(parseFloat(car.speedavg))
                this.setState({sumDistance: sumDistance.reduce((a, b) => a + b)})
                this.setState({sumFueluse: sumFueluse.reduce((a, b) => a + b)})
                this.setState({avgCo2: avgCo2.reduce((a, b) => a + b  )})
                this.setState({avgfuelrate: avgfuelrate.reduce((a, b) => a + b )})
                this.setState({avgspeed: avgspeed.reduce((a, b) => a + b )})
                this.setState({lengthCo2: avgCo2.length})
                this.setState({lengthfuelrate: avgfuelrate.length})
                this.setState({lengthspeed: avgspeed.length })
                
              }
              
            //   console.log(avgspeed)
              
          }.bind(this))
          
        }.bind(this),
        function (error) {
          console.log(error)
        }
      )
    //   this.setState({Co2: this.state.avgCo2/avgCo2.length})
    //   this.setState({fuelrate: this.state.avgfuelrate/avgfuelrate.length})
    //   this.setState({speed: this.state.avgspeed/avgspeed.length})
}
componentWillUnmount(){
    this.history =null
    this. history2 = null
}
colornoti(){
    if(this.props.trips.Fuelrate > this.props.trips.Car.FuelConsumption - (this.props.trips.Car.FuelConsumption * 0.2)){
        return{
            width:142.5,
            marginLeft:25,
            height:60,
            backgroundColor:'white',
            justifyContent:'center',
            borderRadius:5,
            borderWidth:2,
            borderColor:'#6a83fb'
        }
    }
    if(this.props.trips.Fuelrate < this.props.trips.Car.FuelConsumption - (this.props.trips.Car.FuelConsumption * 0.2) && this.props.trips.Fuelrate >= this.props.trips.Car.FuelConsumption - (this.props.trips.Car.FuelConsumption * 0.25)){
        return{
            width:142.5,
            marginLeft:25,
            height:60,
            backgroundColor:'white',
            justifyContent:'center',
            borderRadius:5,
            borderWidth:2,
            borderColor:'orange'
        }
    }
    if(this.props.trips.Fuelrate < this.props.trips.Car.FuelConsumption - (this.props.trips.Car.FuelConsumption * 0.25)){
        return{
            width:142.5,
            marginLeft:25,
            height:60,
            backgroundColor:'white',
            justifyContent:'center',
            borderRadius:5,
            borderWidth:2,
            borderColor:'red'
        }
    }
}

  render() {
   
    // console.log(this.props.trips.fuelraterealtime)
//    console.log(this.props)
//    console.log(this.state.historytrip)
// console.log(this.state.avgCo2)
// console.log(this.state.sumFueluse)
// console.log(this.state.sumDistance)
// console.log(this.state.avgfuelrate)
// console.log(this.state.lengthfuelrate)
// console.log(this.state.avgfuelrate / this.state.lengthfuelrate)

    const contentInset = { top: 20, bottom: 20 }
    const HiHorizontalLine = ({ y }) =>
    <Line key={'zero-axis'} x1={'0%'} x2={'100%'} y1={y(this.props.trips.Car.FuelConsumption)} y2={y(this.props.trips.Car.FuelConsumption)} stroke={'orange'}  strokeWidth={3} />
    return (
        <Container>
            <Tabs>
                <Tab heading="History">
                    <ScrollView>
                    <View style={{flex:1}}>
                    <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',marginTop:20,height:40,width:250,borderRadius:5,backgroundColor:'#6a83fb'}}>
                        <Text style={{color:'white',fontSize:13}}>{this.props.trips.Date}</Text>
                    </View>
                    <View style={{marginLeft:10,width:340,marginTop:10,height:1060,backgroundColor:'#f2f2f2'}}>
                        <Text style={{color:'black',fontSize:20,marginLeft:20,marginTop:10}}>{this.props.trips.Time} - {this.props.trips.Timeend}</Text>
                        <View>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image
                                    style={{width: 25, height: 25,marginLeft: 40,marginTop:12}}
                                    source={require('./place.png')}
                                    />
                                <View style={{height:30,width:240,marginLeft:10,marginTop:10,backgroundColor:'white',borderColor:'#cccccc',borderRadius:5,borderWidth:0.5}}>
                                <Text style={{fontSize:15,color:'#6a83fb',marginLeft:10,marginTop:5,alignItems:'center',alignContent:'center'}}>{this.props.trips.Source}</Text>
                                </View>
                            </View>
                            <View style={{flex:1,flexDirection:'row',marginTop:50}}>
                                <Image
                                    style={{width: 25, height: 25,marginLeft: 40,marginTop:12}}
                                    source={require('./gps.png')}
                                />
                                <View style={{height:30,width:240,marginLeft:10,marginTop:10,backgroundColor:'white',borderColor:'#cccccc',borderRadius:5,borderWidth:0.5}}>
                                <Text style={{fontSize:15,color:'#6a83fb',alignItems:'center',marginLeft:10,marginTop:5,alignContent:'center'}}>{this.props.trips.Destination}</Text>
                                </View>
                            </View>
                            <View style={{flex:1,marginTop:65}}>
                                <View style={{width:290,height:140,backgroundColor:'white',justifyContent:'center',alignSelf:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb',flexDirection:'column'}}>
                                    <View style={{flex:1,flexDirection:'row',marginLeft:40,marginTop:10}}>
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:5}}>Brand</Text>
                                            <Text style={{fontSize:11,color:'#f000ba',marginTop:5}}>{this.props.trips.Car.Make}</Text>
                                        </View>
                                        <Image
                                            style={{width: 25, height: 25,marginLeft: 55,marginTop:12}}
                                            source={require('./cars.png')}
                                        />
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:60}}>Model</Text>
                                            <Text style={{fontSize:11,color:'#f000ba',marginTop:5,marginLeft:50}}>{this.props.trips.Car.Model}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex:1,flexDirection:'row',marginLeft:28,marginTop:10}}>
                                    <Image
                                            style={{width: 25, height: 25,marginTop:12}}
                                            source={require('./gas.png')}
                                        />
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:5}}>Standard</Text>
                                            <Text style={{fontSize:11,color:'#f000ba',marginTop:5,marginLeft:15}}>{this.props.trips.Car.FuelConsumption}</Text>
                                            <Text style={{fontSize:11,color:'#f000ba',marginTop:5,marginLeft:15}}>km/L</Text>
                                        </View>
                                       
                                        <Image
                                            style={{width: 25, height: 25,marginLeft: 80,marginTop:12}}
                                            source={require('./co2.png')}
                                        />
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:10}}>Standard</Text>
                                            <Text style={{fontSize:11,color:'#f000ba',marginTop:5,marginLeft:15}}>{((this.props.trips.Car.FuelType.CO2Emission/this.props.trips.Car.FuelConsumption)*100).toFixed(0)}</Text>
                                            <Text style={{fontSize:11,color:'#f000ba',marginTop:5,marginLeft:15}}>g/km</Text>
                                        </View>
                                    </View>
                                </View>   
                                    
                            </View>
                            <View style={{flex:1,marginTop:145}}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{width:142.5,marginLeft:25,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                        <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:10}}>
                                            <View style={{flexDirection:'column',marginLeft:15}}>        
                                                <Image
                                                    style={{width: 25, height: 25,marginTop:1,marginLeft:5}}
                                                    source={require('./road.png')}
                                                />
                                                <Text style={{fontSize:10,color:'#6a83fb'}}>Distance</Text>
                                            </View>
                                            <View style={{flexDirection:'column',marginLeft:35}}>
                                                <Text style={{fontSize:15,color:'#f000ba'}}>{this.props.trips.Distance}</Text>
                                                <Text style={{fontSize:10,color:'#f000ba',marginTop:5}}>KM</Text>
                                            </View>
                                        </View>        
                                    </View>
                                <View style={{width:142.5,marginLeft:5,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                    <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:10}}>
                                        <View style={{flexDirection:'column',marginLeft:15}}>        
                                            <Image
                                                style={{width: 25, height: 25,marginTop:1,marginLeft:5}}
                                                source={require('./time.png')}
                                            />
                                            <Text style={{fontSize:10,color:'#6a83fb'}}>Duration</Text>
                                        </View>
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontSize:15,color:'#f000ba',marginLeft:5}}>{this.props.trips.Duration}</Text>
                                            <Text style={{fontSize:10,color:'#f000ba',marginTop:5,marginLeft:25}}>mins</Text>
                                        </View>
                                    </View>
                                </View>
                                </View>        
                            </View>
                            <View style={{flex:1,marginTop:65}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={this.colornoti()}>
                                            <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:5}}>
                                            <View style={{flexDirection:'column',marginLeft:2}}>        
                                            <Image
                                            style={{width: 25, height: 25,marginTop:1,marginLeft:18}}
                                            source={require('./gas.png')}
                                            />
                                            <Text style={{fontSize:8,color:'#6a83fb'}}>Fuel Consumption</Text>
                                            <Text style={{fontSize:8,color:'#6a83fb',marginLeft:20}}>Rate</Text>                                            
                                            </View>
                                            <View style={{flexDirection:'column',marginLeft:20}}>
                                            <Text style={{fontSize:15,color:'#f000ba'}}>{this.props.trips.Fuelrate}</Text>
                                            <Text style={{fontSize:10,color:'#f000ba',marginTop:5}}>KM/L</Text>
                                            </View>
                                            </View>        
                                        </View>
                                        <View style={{width:142.5,marginLeft:5,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                            <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:10}}>
                                            <View style={{flexDirection:'column',marginLeft:10}}>        
                                            <Image
                                            style={{width: 25, height: 25,marginTop:1,marginLeft:5}}
                                            source={require('./co2.png')}
                                            />
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:8}}>CO2</Text>
                                            </View>
                                            <View style={{flexDirection:'column',marginLeft:25}}>
                                            <Text style={{fontSize:15,color:'#f000ba'}}>{this.props.trips.CO2}</Text>
                                            <Text style={{fontSize:10,color:'#f000ba',marginTop:5,marginLeft:15}}>KG</Text>
                                            </View>
                                            </View>
                                        </View>
                                    </View>        
                                </View>
                                <View style={{flex:1,marginTop:65}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{width:142.5,marginLeft:25,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                        <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:10}}>
                                        <View style={{flexDirection:'column',marginLeft:2}}>        
                                        <Image
                                        style={{width: 25, height: 25,marginTop:1,marginLeft:18}}
                                        source={require('./oil.png')}
                                        />
                                        <Text style={{fontSize:8,color:'#6a83fb'}}>Fuel Volume Used</Text>
                                        </View>
                                        <View style={{flexDirection:'column',marginLeft:20}}>
                                        <Text style={{fontSize:15,color:'#f000ba'}}>{this.props.trips.Fueluse}</Text>
                                        <Text style={{fontSize:10,color:'#f000ba',marginTop:5,marginLeft:5}}>L</Text>
                                        </View>
                                        </View>        
                                        </View>
                                    <View style={{width:142.5,marginLeft:5,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                        <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:10}}>
                                        <View style={{flexDirection:'column',marginLeft:2}}>        
                                        <Image
                                        style={{width: 25, height: 25,marginTop:1,marginLeft:18}}
                                        source={require('./speed.png')}
                                        />
                                        <Text style={{fontSize:8,color:'#6a83fb',marginLeft:2}}>Average Speed</Text>
                                        </View>
                                        <View style={{flexDirection:'column',marginLeft:12}}>
                                        <Text style={{fontSize:15,color:'#f000ba'}}>{this.props.trips.speedavg}</Text>
                                        <Text style={{fontSize:10,color:'#f000ba',marginTop:5,marginLeft:8}}>km/h</Text>
                                        </View>
                                        </View>
                                        </View>
                                    </View>        
                                </View>
                                <View style={{marginLeft:25,marginTop:70}}>
                                    <Text style={{fontSize:15,color:'black'}}>Compare to Average</Text>
                                </View>
                                <View style={{flex:1,marginTop:10}}>
                                    <View style={{width:290,height:60,backgroundColor:'white',justifyContent:'center',alignSelf:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                    <View style={{flex:1,flexDirection:'row',marginLeft:20,marginTop:5}}>
                                    <View style={{flexDirection:'column',marginLeft:2}}>        
                                    <Image
                                    style={{width: 25, height: 25,marginTop:1,marginLeft:18}}
                                    source={require('./gas.png')}
                                    />
                                    <Text style={{fontSize:8,color:'#6a83fb'}}>Fuel Consumption</Text>
                                    <Text style={{fontSize:8,color:'#6a83fb',marginLeft:20}}>Rate</Text>
                                    </View>
                                    <View style={{flexDirection:'column',marginLeft:30}}>
                                    <Text style={{fontSize:10,color:'#6a83fb',marginLeft:3}}>This Trip</Text>
                                    <Text style={{fontSize:15,color:'#f000ba',marginTop:5}}>{this.props.trips.Fuelrate} km/L</Text>
                                    </View>
                                    <View style={{flexDirection:'column',marginLeft:35}}>
                                    <Text style={{fontSize:10,color:'#6a83fb'}}>Average</Text>
                                    <Text style={{fontSize:15,color:'#f000ba',marginTop:5}}>{parseFloat(this.state.avgfuelrate / this.state.lengthfuelrate).toFixed(2)} km/L</Text>
                                    </View>
                                    </View>
                                    </View>        
                                </View>
                                <View style={{flex:1,marginTop:65}}>
                                    <View style={{width:290,height:60,backgroundColor:'white',justifyContent:'center',alignSelf:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                        <View style={{flex:1,flexDirection:'row',marginLeft:20,marginTop:10}}>
                                        <View style={{flexDirection:'column',marginLeft:2}}>        
                                            <Image
                                            style={{width: 25, height: 25,marginTop:1,marginLeft:18}}
                                            source={require('./co2.png')}
                                            />
                                            <Text style={{fontSize:8,color:'#6a83fb',marginLeft:22}}>CO2</Text>
                                        </View>
                                        <View style={{flexDirection:'column',marginLeft:50}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:3}}>This Trip</Text>
                                            <Text style={{fontSize:15,color:'#f000ba',marginTop:5}}>{this.props.trips.CO2} kg</Text>
                                        </View>
                                        <View style={{flexDirection:'column',marginLeft:25}}>
                                            <Text style={{fontSize:10,color:'#6a83fb'}}>Average</Text>
                                            <Text style={{fontSize:15,color:'#f000ba',marginTop:5}}>{parseFloat(this.state.avgCo2 / this.state.lengthCo2).toFixed(1)} kg</Text>
                                        </View>
                                        </View>
                                    </View>        
                                </View>
                                <View style={{flex:1,marginTop:65}}>
                                    <View style={{width:290,height:60,backgroundColor:'white',justifyContent:'center',alignSelf:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                    <View style={{flex:1,flexDirection:'row',marginLeft:20,marginTop:10}}>
                                        <View style={{flexDirection:'column',marginLeft:2}}>        
                                            <Image
                                            style={{width: 25, height: 25,marginTop:1,marginLeft:18}}
                                            source={require('./speed.png')}
                                            />
                                            <Text style={{fontSize:8,color:'#6a83fb',marginLeft:3}}>Average Speed</Text>
                                        </View>
                                        <View style={{flexDirection:'column',marginLeft:40}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:3}}>This Trip</Text>
                                            <Text style={{fontSize:15,color:'#f000ba',marginTop:5}}>{this.props.trips.speedavg} km/h</Text>
                                        </View>
                                        <View style={{flexDirection:'column',marginLeft:12}}>
                                            <Text style={{fontSize:10,color:'#6a83fb'}}>Average</Text>
                                            <Text style={{fontSize:15,color:'#f000ba',marginTop:5}}>{parseFloat(this.state.avgspeed / this.state.lengthspeed).toFixed(1) } km/h</Text>
                                        </View>
                                    </View>
                                    </View>        
                                </View>
                                {/* <View style={{marginLeft:25,marginTop:70}}>
                                    <Text style={{fontSize:15,color:'black'}}>Standard Comparing</Text>
                                </View>
                                <View style={{flex:1,marginTop:10}}>
                                    <View style={{width:290,height:60,backgroundColor:'white',justifyContent:'center',alignSelf:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                        <View style={{flex:1,flexDirection:'row',marginLeft:20,marginTop:10}}>
                                            <View style={{flexDirection:'column',marginLeft:2}}>        
                                                <Image
                                                style={{width: 25, height: 25,marginTop:1,marginLeft:18}}
                                                source={require('./gas.png')}
                                                />
                                                <Text style={{fontSize:8,color:'#6a83fb'}}>Fuel Consumption</Text>
                                            </View>
                                            <View style={{flexDirection:'column',marginLeft:30}}>
                                                <Text style={{fontSize:10,color:'#6a83fb',marginLeft:3}}>This Trip</Text>
                                                <Text style={{fontSize:15,color:'#ff4d88',marginTop:5}}>{this.props.trips.Fuelrate} KM/L</Text>
                                            </View>
                                            <View style={{flexDirection:'column',marginLeft:30}}>
                                                <Text style={{fontSize:10,color:'#6a83fb'}}>Average Standard</Text>
                                                <Text style={{fontSize:15,color:'#ff4d88',marginTop:5}}>{this.props.trips.Car.FuelConsumption} KM/L</Text>
                                            </View>
                                        </View>
                                    </View>        
                                </View>
                                <View style={{flex:1,marginTop:65}}>
                                    <View style={{width:290,height:60,backgroundColor:'white',justifyContent:'center',alignSelf:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                    <View style={{flex:1,flexDirection:'row',marginLeft:20,marginTop:10}}>
                                    <View style={{flexDirection:'column',marginLeft:2}}>        
                                    <Image
                                    style={{width: 25, height: 25,marginTop:1,marginLeft:18}}
                                    source={require('./co2.png')}
                                    />
                                    <Text style={{fontSize:8,color:'#6a83fb',marginLeft:22}}>CO2</Text>
                                    </View>
                                    <View style={{flexDirection:'column',marginLeft:50}}>
                                    <Text style={{fontSize:10,color:'#6a83fb',marginLeft:3}}>This Trip</Text>
                                    <Text style={{fontSize:15,color:'#ff4d88',marginTop:5}}>{this.props.trips.CO2}KG</Text>
                                    </View>
                                    <View style={{flexDirection:'column',marginLeft:25}}>
                                    <Text style={{fontSize:10,color:'#6a83fb'}}>Average Standard</Text>
                                    <Text style={{fontSize:15,color:'#ff4d88',marginTop:5}}>{((this.props.trips.Car.FuelType.CO2Emission/this.props.trips.Car.FuelConsumption)*100).toFixed(0)} G/KM</Text>
                                    </View>
                                    </View>
                                    </View>        
                                </View> */}
                                <View style={{marginLeft:25,marginTop:70}}>
                                    <Text style={{fontSize:15,color:'black'}}>Driving Trend</Text>
                                    <Text style={{fontSize:10,color:'black'}}>Do I drive better than before?</Text>
                                    
                                    
                               </View> 
                               <View style={{marginLeft:25,marginTop:20,flexDirection:'row'}}>
                                    <Text style={{fontSize:10,color:'black'}}>Average Fuelrate Standard</Text>
                                    <Text style={{fontSize:10,color:'orange'}}>  --------------------------</Text>
                               </View>
                               <View style={{marginLeft:25,marginTop:10,flexDirection:'row'}}>
                                    <Text style={{fontSize:10,color:'black'}}>Fuelrate this trip</Text>
                                    <View style={styles.circle}></View>
                               </View>
                                    
                                    
                                
                        </View>
                    </View>
                    {/* <View>
                        <View style={{marginHorizontal:75}}>
                            <Text>Trips</Text>
                        </View>
                        <Text>Date: {this.props.trips.Date}</Text>
                        <Text>Time: {this.props.trips.Time} - {this.props.trips.Timeend}</Text>
                        <Text>Duration: {this.props.trips.Duration}</Text>
                        <Text>Source: {this.props.trips.Source}</Text>
                        <Text>Destination: {this.props.trips.Destination}</Text>
                        <Text>Distance: {this.props.trips.Distance} KM</Text>
                        <Text>Fueluse: {this.props.trips.Fueluse} L</Text>
                        <Text>Fuelrate: {this.props.trips.Fuelrate} KM/L</Text>
                        <Text>CO2: {this.props.trips.CO2} KG</Text>
                        
                        </View>
                        
                            <View style={{flex:1,flexDirection:'column'}}>
                            
                            <View>
                                <View style={{marginBottom:50}}>
                                    <Text style={{textAlign:'center'}}>Car.go.th</Text>
                                    <Text>Car: {this.props.trips.Car.Make} {this.props.trips.Car.Model}</Text>
                                    <Text>Fuelrate: {this.props.trips.Car.FuelConsumption} KM/L</Text>
                                    <Text>CO2Emission: {((this.props.trips.Car.FuelType.CO2Emission/this.props.trips.Car.FuelConsumption)*100).toFixed(0)} G/KM</Text>
                                    
                                </View>
                                
                            </View>
                                <View>
                                    <Text style={{textAlign:'center'}}>Average of you</Text>
                                    <Text>Average of you</Text>
                                    <Text>Average of you</Text>
                                    <Text>Average of you</Text>
                                    <Text>Average of you</Text>
                                </View>
                            
                        </View> */}
                    </View>
                    <View style={{  position: 'absolute' ,
                                    flex:1,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor:'white',
                                    flexDirection:'row',
                                    height:200,
                                    alignItems:'center',
                                }}>
                        <YAxis
                            data={ this.props.trips.fuelraterealtime }
                            contentInset={ contentInset }
                            svg={{ 
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={ 3 }
                            formatLabel={ value => `${value} KM/L` }
                            min={0}
                            max={40}
                        />
                    <AreaChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={this.props.trips.fuelraterealtime}
                        contentInset={{ top: 20, bottom: 20 }}
                        curve={ shape.curveNatural }
                        svg={{ fill: '#90d1fa' , }}
                        gridMin={0}  
                        gridMax={40}
                    >
                    <Grid />
                    <HiHorizontalLine />
                    </AreaChart>
                </View>
                </ScrollView>
            </Tab>
        </Tabs> 
        <Text></Text>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
    circle:{
        width: 20,
        height: 20,
        backgroundColor: '#90d1fa',
        borderRadius: 10,
        marginLeft:10
    }
})