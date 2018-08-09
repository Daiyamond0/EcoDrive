import { connect } from 'react-redux';
import { StartMap } from '../../components/startmap/startmap';
import { getDistance} from '../../actions/startmap/actions'
const mapStateToProps = state => ({
  text: state.SelectMyCarReducer.text,
  });
  const mapDispatchToProps =  {
    getDistance:getDistance
}

export default connect(mapStateToProps,mapDispatchToProps)(StartMap);