import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#e9f7fd',
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
    paddingRight: 0,
  },
  footer:{
    position: 'relative',
   flex:1,
    left: 0,
    right: 0,
    bottom: 0,
    height:40,
    alignItems:'center',
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
});
