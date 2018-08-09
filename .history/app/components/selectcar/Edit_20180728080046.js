import React, { Component } from 'react';
import { View ,TouchableHighlight,StyleSheet,ListView ,Button,Text , TouchableOpacity} from 'react-native';
import { ListItem,List ,Picker,Footer, FooterTab,Container} from 'native-base'
import { Actions } from 'react-native-router-flux';

export class Edit extends React.Component {
  render() {
    return (
      <View style={styles.mainviewStyle}>
        <Text>Edit</Text>
        <Text>{this.props.index}</Text>
        <Text>{JSON.stringify(this.props.editdetail)}</Text>
        <View>
            <List dataArray={this.props.editdetail} 
            renderRow={(item,index,key) =>{
              return(
                <TouchableHighlight >
              <ListItem>
                <View >
                <Text>Make: {item.Make}</Text>
                <Text>Model: {item.Model}</Text>
                <Text>Speed:{item.Speed} </Text>
                <Text>Fueltype: {item.FuelType.FuelType}</Text>
                </View>
              </ListItem>            
              </TouchableHighlight>
              
              )
            }
            } >
          </List>
            </View>
            <View style={styles.footer}>
          <TouchableHighlight style={styles.bottomButtons} onPress={}>
              <Text style={styles.footerText}>{OK}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.bottomButtons} onPress={}>
              <Text style={styles.footerText}>CANCEL</Text>
          </TouchableHighlight>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainviewStyle: {
      flex: 1,
      flexDirection: 'column',
    },
    footer: {
      position: 'absolute',
      flex:0.1,
      left: 0,
      right: 0,
      bottom: -10,
      backgroundColor:'green',
      flexDirection:'row',
      height:80,
      alignItems:'center',
    },
    bottomButtons: {
      alignItems:'center',
      justifyContent: 'center',
      flex:1,
    },
    footerText: {
      color:'white',
      fontWeight:'bold',
      alignItems:'center',
      fontSize:18,
    },
   
  });