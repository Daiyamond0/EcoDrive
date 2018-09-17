import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  ListView,
  Button,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
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
import Icon from 'react-native-vector-icons/Ionicons';

export class EditCar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      carediter: []
    }
  }

  componentWillMount () {
    const uid = this.props.user.uid
    this.props.MyCarlist(uid) /// ดึงรายละเอียดแต่ละคันของ user
    this.props.EditMyCar(uid) /// ดึง uid car ของ user
  }

  removeCar (car) {
    console.log(JSON.stringify(car))
    const x = Object.values(this.props.editcar)[car] /// ตำแหน่ง uid ที่จะลบ
    const uid = this.props.user.uid
    console.log(x)
    firebaseService.database().ref(`user/${uid}/`).child(x).remove()
    Actions.refresh('editcar')
  }

  editCar (item, key) {
    this.props.EditDetail(item, key)
    Actions.push('edit')
  }

  render () {
    // console.log(this.props.mycar)
    // console.log(this.state.carselected)
    //  console.log(Object.values(this.props.editcar)[1])

    return (
      <View style={styles.mainviewStyle}>
      <ImageBackground
      style={styles.container}
      source={require('../Image/backgroundEdit.png')}
      imageStyle={{ resizeMode: 'cover' }}
    >
     </ImageBackground>
        {/* <Text>{JSON.stringify(this.props.mycar)}</Text> */}
        <View>
          <List
            dataArray={this.props.mycar}
            renderRow={(item, index, key) => {
              return (
                <ImageBackground
                style={styles.container}
                source={require('../Image/Editcar.png')}
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
                    <View style={{ marginLeft: 20 }}>
                      <View style={{ margin: 10,marginLeft:1,marginRight:60,borderRadius:100,marginTop:5 }}>
                        <Button onPress={() => this.removeCar(key)}key={index} title='delete Car'/>
                      </View>
                      <View style={{borderRadius:100,margin:10,marginLeft:1,marginRight:60}}>
                        <Button onPress={() => this.editCar(item, key)} title='Edit'/>
                        </View>
                    </View>
                  </ListItem>
                </TouchableHighlight>
              </ImageBackground>
              )
            }}
          />
        </View>

        {/* <View>
            <List dataArray={this.props.editcar}
            renderRow={(item,index) =>{
              console.log(item)
              return(
                <TouchableHighlight >
              <ListItem>
                <View >
                <Text>Make: {item.Make}</Text>
                <Text>Model: {item.Model}</Text>
                <Text>Speed:{item.Speed} </Text>
                <Text>Fueltype: {item.FuelType}</Text>
                </View>
                <View style={{marginLeft:100}}>
                  <View>
                    <Button title='Remove' onPress={() =>this.removeCar(item)} key={index} />
                    <Button title='Edit'/>
                  </View>
                </View>
              </ListItem>

              </TouchableHighlight>

              )
            }
            } >
          </List>
            </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  
})
