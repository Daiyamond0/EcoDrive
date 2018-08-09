import { connect } from 'react-redux';
import { CreateCar } from '../../components/selectcar/Createcar';

import {carlist} from '../../actions/selectcar/carlist'

const mapStateToProps = (state) => {
  return { 
    carlist: state.carlist
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    ShowCarList:carlist
  };
}
  

export default connect(mapStateToProps,mapDispatchToProps)(CreateCar);