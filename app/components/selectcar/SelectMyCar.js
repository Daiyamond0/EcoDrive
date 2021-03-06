import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  TouchableHighlight,
  StyleSheet,
  ImageBackground
} from 'react-native'
import { ListItem, List } from 'native-base'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { Actions } from 'react-native-router-flux'
import firebaseService from '../../enviroments/firebase.js'
export class SelectMyCar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mycar:[]
    }
  }

  componentWillMount () {
    const uid = this.props.user.uid
    this.props.MyCarlist(uid)
    const car = []
 this.car = firebaseService.database().ref(`user/${uid}/`).once(
    'value',
    function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (childchildSnapshot) {
          const yourcar = childchildSnapshot.val()
          car.push(yourcar)
          
        })
      })
      this.setState({mycar:car})
    }.bind(this),
    function (error) {
      console.log(error)
    }
  )
  }

  componentWillUnmount(){
    this.car = null
  }
  gohome(){
    Actions.pop('createcar')
    Actions.replace('home')
    Actions.refresh('selectmycar')
  }
  render () {
    // console.log(this.state.mycar)
    // console.log(this.props.mycar)
    return (
      <View style={styles.mainviewStyle}>
      <ImageBackground
      style={styles.container}
      source={require('../Image/MyCar.png')}
      imageStyle={{ resizeMode: 'cover' }}
    >
        <View>
          <RadioGroup
            onSelect={(index, value) => this.props.onSelect(index, value)}
          style={{marginBottom:60}}>
            {this.state.mycar.map((item, index) => {
              return (
                <RadioButton value={item} key={index}>
                  <Text>{item.Make + ' ' + item.Model}</Text>
                </RadioButton>
              )
            })}
          </RadioGroup>
          <Text>{JSON.stringify(this.props.text)}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight
            style={styles.bottomButtons}
            onPress={() => this.gohome()}
          >
            <Text style={styles.footerText}>Select</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  valueText: {
    fontSize: 18,
    marginBottom: 50
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: 'green',
    flexDirection: 'row',
    height: 55,
    alignItems: 'center'
  },
  bottomButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 14,
    marginBottom:5
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
})
