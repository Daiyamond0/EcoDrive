import { connect } from 'react-redux';
import { EditCar } from '../../components/selectcar/EditCar';

import {MyCarlist} from '../../actions/selectcar/Mycar'

const mapStateToProps = state => ({
    user: state.sessionReducer.user,
     mycar: state.MycarReducer.mycar,
     
  });

const mapDispatchToProps =  {
  MyCarlist:MyCarlist
  }
export default connect(mapStateToProps)(EditCar);
