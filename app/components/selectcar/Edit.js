import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  ListView,
  Button,
  ImageBackground,
  Text,
  TouchableOpacity
} from 'react-native'
import {
  ListItem,
  List,
  Picker,
  Footer,
  FooterTab,
  Container
} from 'native-base'
import { Actions } from 'react-native-router-flux'
import firebaseService from '../../enviroments/firebase'
export class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  onValueChange (value) {
    this.setState({
      selected: value
    })
  }
  edit () {
    const fueltype = {
      '0': ['Diesel', 2600],
      '1': ['E20', 2300],
      '2': ['E85', 2360]
    }
    const x = this.state.selected
    const select = fueltype[x]

    const id = this.props.editcar[this.props.index]
    const uid = this.props.user.uid
    firebaseService.database().ref(`user/${uid}/${id}/car/FuelType`).update({
      CO2Emission: select[1],
      FuelType: select[0]
    })
  }

  render () {
    const fueltype = {
      '0': ['Diesel', 2600],
      '1': ['E20', 2300],
      '2': ['E85', 2360]
    }
    return (
      <ImageBackground
                style={styles.container}
                source={require('../Image/Edit.png')}
                imageStyle={{ resizeMode: 'cover' }}
              >
      <View style={styles.mainviewStyle}>

        {/* <Text>{this.props.index}</Text> */}
        {/* <Text>{JSON.stringify(this.props.editdetail)}</Text> */}
        <View>
          <List>
            <ListItem><Text>Make: {this.props.editdetail.Make}</Text></ListItem>
            <ListItem>
              <Text>Model: {this.props.editdetail.Model}</Text>
            </ListItem>
            <ListItem>
              <Text>Speed: {this.props.editdetail.Speed}</Text>
            </ListItem>
            <ListItem>
              <Text>FuelType: </Text>
              <Picker
                mode='dropdown'
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item
                  label={this.props.editdetail.FuelType.FuelType}
                  value={this.props.editdetail.CO2Emission}
                />
                <Picker.Item label='----------' value='0' />
                {Object.values(fueltype).map((item, index) => {
                  return (
                    <Picker.Item label={item[0]} value={index} key={index} />
                  )
                })}
              </Picker>
            </ListItem>
          </List>

        </View>
        <View style={{marginTop:330,marginLeft:65,marginRight:65,backgroundColor:'#b33c00'}}>
          <Button style={styles.bottomButtons}
            onPress={() => this.edit()} title='OK'></Button>
      </View>
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: 'green',
    flexDirection: 'row',
    height: 80,
    alignItems: 'center'
  },
  bottomButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor:'#b33c00',
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
})
