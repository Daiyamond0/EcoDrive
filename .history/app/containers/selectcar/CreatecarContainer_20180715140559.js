import { connect } from 'react-redux';
import { CreateCar } from '../../components/selectcar/Createcar';

import {carlist,onValueChange,Modellist} from '../../actions/selectcar/carlist'

const mapStateToProps = state => ({
    cardata: state.selectcarReducer.cardata,
    select: state.selectcarReducer.select,
    model: state.selectcarReducer.model
});

const mapDispatchToProps =  {
    carlist: carlist,
    onValueChange : onValueChange,
    Modellist:Modellist
    
}
  

export default connect(mapStateToProps,mapDispatchToProps)(CreateCar);