import { connect } from 'react-redux';
import { CreateCar } from '../../components/selectcar/Createcar';

import {carlist,onValueChange,selectmakecar} from '../../actions/selectcar/carlist'

const mapStateToProps = state => ({
    cardata: state.selectcarReducer.cardata,
    select: state.selectcarReducer.select,
});

const mapDispatchToProps =  {
    carlist: carlist,
    onValueChange : onValueChange,
    selectmakecar : selectmakecar
}
  

export default connect(mapStateToProps,mapDispatchToProps)(CreateCar);