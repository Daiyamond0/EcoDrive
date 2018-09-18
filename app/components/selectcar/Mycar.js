import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  ListView,
  Button,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ListItem,
  List,
  Picker,
  Footer,
  FooterTab,
  Container
} from 'native-base'
import { Actions } from 'react-native-router-flux'
const { height } = Dimensions.get('window')

export class MyCar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      carselected: []
    }
  }

  componentWillMount () {
    const uid = this.props.user.uid
    this.props.MyCarlist(uid)
  }

  onValueChange (value) {
    this.setState({
      carselected: value
    })
  }
  state = {
    screenHeight:0,
  };
  onContentSizeChange = (contentWidth, contentHeight)=>{
    this.setState({screenHeight:contentHeight});
  }
  render () {
    // console.log(this.props.mycar)
    // console.log(this.state.carselected)
    const scrollEnabled = false;
    return (
      <View style={styles.mainviewStyle}>
      <ImageBackground
      style={styles.container}
      source={require('../Image/home.png')}
      imageStyle={{ resizeMode: 'cover' }}
    >
        {/* <Text>{JSON.stringify(this.props.mycar)}</Text> */}
          </ImageBackground>
        <View>
          <List
            dataArray={Object.values(this.props.mycar)}
            renderRow={item => {
              return (
                <ImageBackground
      style={styles.container}
      source={require('../Image/Car.png')}
      imageStyle={{ resizeMode: 'cover' }}
    >
                <TouchableHighlight>
                  <ListItem>
                    <View>
                    <Text>Make: {item.Make}</Text>
                    <Text>Model: {item.Model}</Text>
                    <Text>Speed:{item.Speed} </Text>
                    <Text>Fueltype: {item.FuelType.FuelType}</Text>
                    </View>
                  </ListItem>
                </TouchableHighlight>
                </ImageBackground>  
              )
            }}
          />

        </View>

{/* <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.state.carselected}
              onValueChange={this.onValueChange.bind(this)}
              >
              {Object.values(this.props.mycar).map((item, index ) => {
                return (< Picker.Item label={item.Make+" "+item.Model} value={item}  key={index} />);
              })}
            </Picker> */}

            {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='green' title="Select Car" onPress={Actions.selectmycar}>
            <Icon name="md-search" style={styles.actionButtonIcon} />
          </ActionButton.Item>
              {this.props.CarSelect.Make === undefined &&
                this.props.CarSelect.Model === undefined
                ? 'SelectCar'
                : this.props.CarSelect.Make + ' ' + this.props.CarSelect.Model}
          <ActionButton.Item buttonColor='#9b59b6' title="Edit Car" onPress={Actions.editcar}>
            <Icon name="md-clipboard" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  rowText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  scrollview:{
    flexGrow:1,
  },
  rowStyle: {
    backgroundColor: '#333333',
    flex: 1,
    height: 100,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0
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
    flex: 1
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18
  }
})
