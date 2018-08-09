import { connect } from 'react-redux';
import { SelectMyCar } from '../../components/selectcar/SelectMyCar';

import {MyCarlist} from '../../actions/selectcar/Mycar'

const mapStateToProps = state => ({
  mycar: state.MycarReducer.mycar,
  user: state.sessionReducer.user,
  });
  const mapDispatchToProps =  {
    MyCarlist:MyCarlist
    }



export default connect(mapStateToProps,mapDispatchToProps)(SelectMyCar);