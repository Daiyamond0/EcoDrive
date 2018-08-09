import { connect } from 'react-redux';
import { SelectMyCar } from '../../components/selectcar/SelectMyCar';

import {MyCarlist} from '../../actions/selectcar/Mycar'
import {onSelect} from '../../actions/selectcar/SelectMyCar'
const mapStateToProps = state => ({
  mycar: state.MycarReducer.mycar,
  user: state.sessionReducer.user,
  text: state.SelectMyCarReducer.text,
  });
  const mapDispatchToProps =  {
    MyCarlist:MyCarlist,
    onSelect:onSelect
    }



export default connect(mapStateToProps,mapDispatchToProps)(SelectMyCar);