import { connect } from 'react-redux';
import { EditCar } from '../../components/selectcar/EditCar';

import {MyCarlist} from '../../actions/selectcar/Mycar'
import {EditMyCar,EditDetail} from '../../actions/selectcar/EditCar'

const mapStateToProps = state => ({
    user: state.sessionReducer.user,
     mycar: state.MycarReducer.mycar,
     editcar:state.EditCarReducer.editcar,
     
  });

const mapDispatchToProps =  {
  MyCarlist:MyCarlist,
  EditMyCar:EditMyCar,
  EditDetail:EditDetail

  }
export default connect(mapStateToProps,mapDispatchToProps)(EditCar);
