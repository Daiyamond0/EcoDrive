import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
  },
  primary: {
    color: 'rgb(116, 70, 195)'
  },
  marginBox: {
    alignItems: 'center',
    margin: 20,
    paddingLeft: -20,

  },
  title: {
    fontSize: 18,
    margin: 20,
    paddingRight: 15,
    alignItems: 'center'
  },
  footer1: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    backgroundColor: 'yellow',
    flexDirection: 'row',
    height: 70,
    alignItems: 'center'
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 70,
    alignItems: 'center'
  },
  footerText: {
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 10,
    marginBottom:2
  },
  s2:{
    marginLeft:30,
    marginRight:30,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    borderRadius:10,
    backgroundColor: '#6a83fb',
    flexDirection: 'row',
    height: 33,
    alignItems: 'center',
    marginTop:20,
    justifyContent:'center',
  },
  s4:{
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    backgroundColor: '#6a83fb',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent:'center',
  },
  s1:{
    marginTop:15,
    marginLeft:20,
    marginRight:20,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    backgroundColor: '#ffff',
    flexDirection: 'row',
    height: 150,
  },
  s3:{
    marginTop:45,
    marginLeft:35,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    position:'absolute',
    backgroundColor: '#ffff',
    flexDirection: 'row',
    height: 80,
  },
  MainContainer :{
 
    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex:1,
    margin: 10
     
    },
  topBar:{
    height: 56, 
    paddingHorizontal: 16,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' ,
    elevation: 6,
    backgroundColor: '#7B1FA2'
  },
  heading:{
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    color: '#FFFFFF'
  },
  enableInfoWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon:{
    width:24,
    height:24
  }
});
