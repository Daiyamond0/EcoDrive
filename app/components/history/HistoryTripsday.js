import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Content, Tab, Tabs ,Picker,List,ListItem ,Card, CardItem,} from 'native-base';

import firebaseService from '../../enviroments/firebase'


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
      console.log(date.toLocaleDateString())
    //   console.log(this.props.trips)
    return (
        <Container>
    <Tabs>
    {this.state.date.reverse().map((item,index)=>{
        return(
          <Tab heading={item}>
    
          </Tab>
        
        )
    })}
        </Tabs> 
      </Container>
    )
  }
}