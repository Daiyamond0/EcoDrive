import React, { Component } from 'react';
import { View ,TouchableHighlight,StyleSheet,ListView ,Button,Text , TouchableOpacity} from 'react-native';
import { ListItem,List ,Picker,Footer, FooterTab,Container} from 'native-base'
import { Actions } from 'react-native-router-flux';
import firebaseService from '../../enviroments/firebase';
export class EditCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     carediter: []
 
    };
     
    
  }

  componentWillMount(){
   const uid = this.props.user.uid;
   this.props.MyCarlist(uid); /// ดึงรายละเอียดแต่ละคันของ user
   this.props.EditMyCar(uid); /// กึง uid car ของ user

  
  }
  
  
  
 
  removeCar(car){
    console.log(JSON.stringify(car))
   const x =  Object.values(this.props.editcar)[car] /// ตำแหน่ง uid ที่จะลบ 
   const uid = this.props.user.uid;
   console.log(x)
   firebaseService.database().ref(`user/${uid}/`).child(x).remove();
   Actions.refresh('editcar');
  }

  editCar(){
    Actions.edit
  }

  render() {
    // console.log(this.props.mycar)
    // console.log(this.state.carselected)
  //  console.log(Object.values(this.props.editcar)[1])

    return (
      
      <View style={styles.mainviewStyle}>
        {/* <Text>{JSON.stringify(this.props.mycar)}</Text> */}
        <View>
            <List dataArray={this.props.mycar} 
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
                <View style={{marginLeft:100}}> 
                  <View>
                    <Button title='Remove' onPress={() =>this.removeCar(key)} key={index} />
                    <Button title='Edit' onPress={()=>this.editCar()} key={index} />
                  </View>
                </View>
              </ListItem>            
              </TouchableHighlight>
              
              )
            }
            } >
          </List>
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
            );
            
}
}

const styles = StyleSheet.create({

  mainviewStyle: {
    flex: 1,
    flexDirection: 'column',
  },
 
 
});
  
  