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
        }
      }

componentWillMount(){
    const uid = this.props.user.uid
    var history = []
    firebaseService.database().ref(`History/${uid}/`).once(
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
    
    firebaseService.database().ref(`History/${uid}/`).once(
        'value',
        function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
              const car = childSnapshot.val()
              if((this.props.trips.Car.Make +' '+ this.props.trips.Car.Model).includes(car.Car.Make +' '+ car.Car.Model)){
                sumDistance.push(car.Distance)
                sumFueluse.push(parseFloat(car.Fueluse))
                avgCo2.push(parseFloat(car.CO2))
                avgfuelrate.push(car.Fuelrate)
                avgspeed.push(car.speedavg)
                this.setState({sumDistance: sumDistance.reduce((a, b) => a + b)})
                this.setState({sumFueluse: sumFueluse.reduce((a, b) => a + b)})
                this.setState({avgCo2: avgCo2.reduce((a, b) => a + b  / avgCo2.length)})
                this.setState({avgfuelrate: avgfuelrate.reduce((a, b) => a + b / avgfuelrate.length )})
                this.setState({avgspeed: avgspeed.reduce((a, b) => a + b / avgspeed.length )})

              }
            console.log(avgspeed)
              
              
          }.bind(this))
          
        }.bind(this),
        function (error) {
          console.log(error)
        }
      )

}

  render() {
   
    // console.log(this.props.trips.fuelraterealtime)
//    console.log(this.props)
//    console.log(this.state.historytrip)
// console.log(this.state.avgCo2)
// console.log(this.state.sumFueluse)
// console.log(this.state.sumDistance)
console.log(this.state.avgspeed)

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
                    <View style={{marginLeft:10,width:340,marginTop:10,height:1115,backgroundColor:'#f2f2f2'}}>
                        <Text style={{color:'black',fontSize:20,marginLeft:20,marginTop:10}}>{this.props.trips.Time} - {this.props.trips.Timeend}</Text>
                        <View>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image
                                    style={{width: 25, height: 25,marginLeft: 40,marginTop:12}}
                                    source={require('./place.png')}
                                    />
                                <View style={{height:30,width:240,marginLeft:10,marginTop:10,backgroundColor:'white',borderColor:'#cccccc',borderRadius:5,borderWidth:0.5}}>
                                <Text style={{fontSize:15,color:'#6a83fb',alignItems:'center',alignContent:'center'}}>{this.props.trips.Source}</Text>
                                </View>
                            </View>
                            <View style={{flex:1,flexDirection:'row',marginTop:50}}>
                                <Image
                                    style={{width: 25, height: 25,marginLeft: 40,marginTop:12}}
                                    source={require('./gps.png')}
                                />
                                <View style={{height:30,width:240,marginLeft:10,marginTop:10,backgroundColor:'white',borderColor:'#cccccc',borderRadius:5,borderWidth:0.5}}>
                                <Text style={{fontSize:15,color:'#6a83fb',alignItems:'center',alignContent:'center'}}>{this.props.trips.Destination}</Text>
                                </View>
                            </View>
                            <View style={{flex:1,marginTop:65}}>
                                <View style={{width:290,height:60,backgroundColor:'white',justifyContent:'center',alignSelf:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                    <View style={{flex:1,flexDirection:'row',marginLeft:40,marginTop:10}}>
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:5}}>Brand</Text>
                                            <Text style={{fontSize:11,color:'#ff4d88',marginTop:5}}>{this.props.trips.Car.Make}</Text>
                                        </View>
                                        <Image
                                            style={{width: 25, height: 25,marginLeft: 55,marginTop:12}}
                                            source={require('./cars.png')}
                                        />
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:60}}>Model</Text>
                                            <Text style={{fontSize:11,color:'#ff4d88',marginTop:5,marginLeft:50}}>{this.props.trips.Car.Model}</Text>
                                        </View>
                                    </View>
                                </View>        
                            </View>
                            <View style={{flex:1,marginTop:65}}>
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
                                                <Text style={{fontSize:15,color:'#ff4d88'}}>{this.props.trips.Distance}</Text>
                                                <Text style={{fontSize:10,color:'#ff4d88',marginTop:5}}>KM</Text>
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
                                            <Text style={{fontSize:15,color:'#ff4d88',marginLeft:5}}>{this.props.trips.Duration}</Text>
                                            <Text style={{fontSize:10,color:'#ff4d88',marginTop:5,marginLeft:25}}>mins</Text>
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
                                            source={require('./gas.png')}
                                            />
                                            <Text style={{fontSize:8,color:'#6a83fb'}}>Fuel Consumption</Text>
                                            </View>
                                            <View style={{flexDirection:'column',marginLeft:20}}>
                                            <Text style={{fontSize:15,color:'#ff4d88'}}>{this.props.trips.Fuelrate}</Text>
                                            <Text style={{fontSize:10,color:'#ff4d88',marginTop:5}}>KM/L</Text>
                                            </View>
                                            </View>        
                                        </View>
                                        <View style={{width:142.5,marginLeft:5,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
                                            <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:10}}>
                                            <View style={{flexDirection:'column',marginLeft:15}}>        
                                            <Image
                                            style={{width: 25, height: 25,marginTop:1,marginLeft:5}}
                                            source={require('./co2.png')}
                                            />
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:8}}>CO2</Text>
                                            </View>
                                            <View style={{flexDirection:'column',marginLeft:35}}>
                                            <Text style={{fontSize:15,color:'#ff4d88'}}>{this.props.trips.CO2}</Text>
                                            <Text style={{fontSize:10,color:'#ff4d88',marginTop:5}}>G/KM</Text>
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
                                        <Text style={{fontSize:15,color:'#ff4d88'}}>{this.props.trips.Fueluse}</Text>
                                        <Text style={{fontSize:10,color:'#ff4d88',marginTop:5,marginLeft:5}}>L</Text>
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
                                        <View style={{flexDirection:'column',marginLeft:20}}>
                                        <Text style={{fontSize:15,color:'#ff4d88'}}>{this.props.trips.speedavg}</Text>
                                        <Text style={{fontSize:10,color:'#ff4d88',marginTop:5}}>km/h</Text>
                                        </View>
                                        </View>
                                        </View>
                                    </View>        
                                </View>
                                <View style={{marginLeft:25,marginTop:70}}>
                                    <Text style={{fontSize:15,color:'black'}}>Average Trips Comparing</Text>
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
                                    <Text style={{fontSize:10,color:'#6a83fb'}}>Average trips</Text>
                                    <Text style={{fontSize:15,color:'#ff4d88',marginTop:5}}>{parseFloat(this.state.avgfuelrate).toFixed(2)} KM/L</Text>
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
                                            <Text style={{fontSize:15,color:'#ff4d88',marginTop:5}}>{this.props.trips.CO2} KG</Text>
                                        </View>
                                        <View style={{flexDirection:'column',marginLeft:25}}>
                                            <Text style={{fontSize:10,color:'#6a83fb'}}>Total trips</Text>
                                            <Text style={{fontSize:15,color:'#ff4d88',marginTop:5}}>{parseFloat(this.state.avgCo2).toFixed(1)} KG</Text>
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
                                            <Text style={{fontSize:15,color:'#ff4d88',marginTop:5}}>{this.props.trips.speedavg} KM/H</Text>
                                        </View>
                                        <View style={{flexDirection:'column',marginLeft:30}}>
                                            <Text style={{fontSize:10,color:'#6a83fb'}}>Average trips</Text>
                                            <Text style={{fontSize:15,color:'#ff4d88',marginTop:5}}>{parseFloat(this.state.avgspeed).toFixed(1) } KM/H</Text>
                                        </View>
                                    </View>
                                    </View>        
                                </View>
                                <View style={{marginLeft:25,marginTop:70}}>
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
                                </View>
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
                        svg={{ fill: 'rgba(134, 65, 244, 0.8)' , }}
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
      </Container>
    )
  }
}


const styles = StyleSheet.create({
    circle:{
        width: 20,
        height: 20,
        backgroundColor: 'rgba(134, 65, 244, 0.8)',
        borderRadius: 10,
        marginLeft:10
    }
})