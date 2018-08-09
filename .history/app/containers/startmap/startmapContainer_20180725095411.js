import { connect } from 'react-redux';
import { StartMap } from '../../components/startmap/startmap';

const mapStateToProps = state => ({
  text: state.SelectMyCarReducer.text,
  });
  

export default connect(mapStateToProps)(StartMap);