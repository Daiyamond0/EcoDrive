import { connect } from 'react-redux';
import { CreateCar } from '../../components/selectcar/Createcar';

import {carlist,MakeChange,Modelchange,Cardetail,MakeCar,AddCar} from '../../actions/selectcar/carlist'

const mapStateToProps = state => ({
    cardata: state.selectcarReducer.cardata,
    make: state.selectcarReducer.make,
    model: state.selectcarReducer.model,
    modelselect: state.selectcarReducer.modelselect,
    detailmodel:state.selectcarReducer.detailmodel,
    user: state.sessionReducer.user,
    seriecars:state.selectcarReducer.seriecars,
});

const mapDispatchToProps =  {
    carlist: carlist,
    MakeChange : MakeChange,
    Modelchange:Modelchange,
    Cardetail:Cardetail,
    MakeCar:MakeCar,
    AddCar:AddCar,
    SerieCar:SerieCar,
    
    
}
  

export default connect(mapStateToProps,mapDispatchToProps)(CreateCar);