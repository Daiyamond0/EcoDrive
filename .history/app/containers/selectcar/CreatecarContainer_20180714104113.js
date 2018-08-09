import { connect } from 'react-redux';
import { CreateCar } from '../../components/selectcar/Createcar';

import {carlist} from '../../actions/selectcar/carlist'

const mapStateToProps = state => ({
    cardata: state.selectcarReducer.cardata.value
});

const mapDispatchToProps =  dispatch => ({

  carlist:  dispatch(carlist())
  
})
  

export default connect(mapStateToProps,mapDispatchToProps)(CreateCar);