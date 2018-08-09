import { connect } from 'react-redux';
import { EditCar } from '../../components/selectcar/EditCar';

import {MyCarlist} from '../../actions/selectcar/Mycar'
import {EditCar} from '../../actions/selectcar/EditCar'

const mapStateToProps = state => ({
    user: state.sessionReducer.user,
     mycar: state.MycarReducer.mycar,
     editcar:state.EditCarReducer.editcar,
     
  });

const mapDispatchToProps =  {
  MyCarlist:MyCarlist,
  EditCar:EditCar
  }
export default connect(mapStateToProps,mapDispatchToProps)(EditCar);
