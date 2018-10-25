import React, { Component } from 'react'
import { Text, View } from 'react-native'
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
            date:[]
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
   
}

  render() {
    var data = []
    // console.log(this.props.trips.fuelraterealtime)
    for(i = 0;i < this.props.trips.fuelraterealtime.length; i++ ){
        if(this.props.trips.fuelraterealtime[i] < this.props.trips.Car.FuelConsumption){
            data.push(this.props.trips.fuelraterealtime[i] / ((-this.props.trips.Car.FuelConsumption) +1 ))
        }else{
            data.push(this.props.trips.fuelraterealtime[i] / (this.props.trips.Car.FuelConsumption + 1))
        }
    }
    console.log(data)
    const contentInset = { top: 20, bottom: 20 }
    const HiHorizontalLine = ({ y }) =>
    <Line key={'zero-axis'} x1={'0%'} x2={'100%'} y1={y(0)} y2={y(0)} stroke={'orange'}  strokeWidth={3} />
    

    
    return (
        <Container>
    <Tabs>
   
          <Tab heading="DETAIL">
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
                    
                />
                
                <AreaChart
                style={{ flex: 1, marginLeft: 16 }}
                data={ data }
                contentInset={{ top: 20, bottom: 20 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' , 
                
                        }
                }
                
            >
                <Grid />
                <HiHorizontalLine />
            </AreaChart>
            </View>
          </Tab>
        
        
        </Tabs> 
      </Container>
    )
  }
}