import React, { Component } from 'react'
import { View, Button, Text, Image, ImageBackground } from 'react-native';
import { StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


export class SelectCar extends React.Component {
  render () {
    return (
    <ImageBackground
      style={styles.container}
      source={require('../Image/home.png')}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={{alignItems:'center'}}>
      <Image source={require('../auth/LoginForm/create.png')} style={{height:200,width:200}}/>      
      </View>
      <View style={{marginBottom:'30%'}}>
      <View style={{ margin: 10,marginLeft:60,marginRight:60,borderRadius:100 }}>
            <Button onPress={Actions.createcar} title='Create Car' />
          </View>
          <View style={{alignItems:'center'}}>
      <Image source={require('../auth/LoginForm/mycar.png')} style={{height:200,width:200}}/>      
          </View>
      <View style={{ margin: 10,marginLeft:60,marginRight:60,borderRadius:100 }}>          
            <Button onPress={Actions.mycar} title='My Car' />
          </View>       
          </View>
          </ImageBackground>
    )
  }
  
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#e9f7fd',
    },
  },
);
