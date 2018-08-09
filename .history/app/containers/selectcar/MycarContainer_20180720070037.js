import { connect } from 'react-redux';
import { MyCar } from '../../components/selectcar/Mycar';

import {MyCar} from '../../actions/selectcar/Mycar'

const mapStateToProps = state => ({
     user: state.sessionReducer.user,
     mycar: state.MycarReducer.mycar,
  });

const mapDispatchToProps =  {
    MyCar:MyCar
  }


export default connect(mapStateToProps,mapDispatchToProps)(MyCar);