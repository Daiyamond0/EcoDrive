import React, { Component } from 'react';
import { View ,TouchableHighlight,StyleSheet,ListView ,Button,Text} from 'react-native';
import { ListItem,List ,Picker,Footer, FooterTab,Container} from 'native-base'
import { Actions } from 'react-native-router-flux';


export class MyCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     carselected: [],
     
    };
    
  }

  componentWillMount(){
    const uid = this.props.user.uid;
    this.props.MyCarlist(uid);
    console.log(uid);

  }
  componentDidMount(){
    // const uid = this.props.user.uid;
    // this.props.MyCarlist(uid);
    // console.log(uid);
  
  }
  componentWillReceiveProps(nextProps){
    //  const uid = this.props.user.uid;
    // this.props.MyCarlist(uid);
    // console.log(uid);

    
  }
  componentWillUpdate(){
     
  }
  componentWillUpdate(nextProps, nextState){
    if( nextProps.mycar == this.props.mycar){
      return false
    }
  }
  
  onValueChange(value) {
    this.setState({
      carselected: value
    });
  }

  render() {
    // console.log(this.props.mycar)
    console.log(this.state.carselected)
   

    return (
      
      <View style={styles.mainviewStyle}>
        {/* <Text>{JSON.stringify(Object.values(this.props.mycar)[0])}</Text> */}
        <View>
            <List dataArray={Object.values(this.props.mycar)} 
            renderRow={(item) =>{
              return(
                <TouchableHighlight >
              <ListItem >
                <Text>Make: {item.Make}</Text>
                <Text>Model: {item.Model}</Text>
                <Text>Speed:{item.Speed} </Text>
              </ListItem>
              </TouchableHighlight>
              )
            }
            } >
          </List>
          
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

        
          <View style={styles.footer}>
          <TouchableHighlight style={styles.bottomButtons} onPress={Actions.selectmycar}>
              <Text style={styles.footerText}>SelectCar</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.bottomButtons}>
              <Text style={styles.footerText}>B</Text>
          </TouchableHighlight>
          </View>
      </View>
        
     
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
  },
  rowText: {
      fontSize: 20,
      textAlign: 'center',
      color: '#FFFFFF'
  },
  rowStyle: {
      backgroundColor: '#333333',
      flex: 1,
      height: 100,
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
  },
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