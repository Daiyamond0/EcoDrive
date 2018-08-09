import { connect } from 'react-redux';
import { CreateCar } from '../../components/selectcar/Createcar';

import {carlist} from '../../actions/selectcar/carlist'

const mapStateToProps = state => ({
    carlist: state.carlist
});

const mapDispatchToProps =  {
    // ShowCarList:carlist
  
}
  

export default connect(mapStateToProps,mapDispatchToProps)(CreateCar);