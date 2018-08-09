import { connect } from 'react-redux';
import { CreateCar } from '../../components/selectcar/Createcar';

import {carlist,onValueChange,Modelchange,Cardetail,MakeCar} from '../../actions/selectcar/carlist'

const mapStateToProps = state => ({
    cardata: state.selectcarReducer.cardata,
    select: state.selectcarReducer.select,
    model: state.selectcarReducer.model,
    modelselect: state.selectcarReducer.modelselect,
    detailmodel:state.selectcarReducer.detailmodel
});

const mapDispatchToProps =  {
    carlist: carlist,
    onValueChange : onValueChange,
    Modelchange:Modelchange,
    Cardetail:Cardetail,
    MakeCar:MakeCar
    
    
}
  

export default connect(mapStateToProps,mapDispatchToProps)(CreateCar);