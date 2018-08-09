import { connect } from 'react-redux';
import { CreateCar } from '../../components/selectcar/Createcar';

import {carlist,onValueChange,selectmakecar} from '../../actions/selectcar/carlist'

const mapStateToProps = state => ({
    cardata: state.selectcarReducer.cardata,
    selected: state.selectcarReducer.selected,
});

const mapDispatchToProps =  ({
    carlist: carlist,
    onValueChange : onValueChange,
    selectmakecar : selectmakecar
})
  

export default connect(mapStateToProps,mapDispatchToProps)(CreateCar);