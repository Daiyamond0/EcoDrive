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

export class SelectMyCar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    const uid = this.props.user.uid
    this.props.MyCarlist(uid)
  }

  render () {
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
            {this.props.mycar.map((item, index) => {
              return (
                <RadioButton value={item} key={index}>
                  <Text>{item.Make + ' ' + item.Model}</Text>
                </RadioButton>
              )
            })}
          </RadioGroup>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight
            style={styles.bottomButtons}
            onPress={() => Actions.home()}
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
