import { connect } from 'react-redux';
import { SelectMyCar } from '../../components/selectcar/SelectMyCar';



const mapStateToProps = state => ({
  mycar: state.MycarReducer.mycar,
  });




export default connect(mapStateToProps)(SelectMyCar);