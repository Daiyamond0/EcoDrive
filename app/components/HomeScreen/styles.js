import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#e9f7fd',
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
  footer: {
   
   
    backgroundColor: 'green',
    flexDirection: 'row',
    height: 55,
    alignItems: 'center'
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