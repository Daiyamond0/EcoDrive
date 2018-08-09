import { connect } from 'react-redux';
import { StartMap } from '../../components/startmap/startmap';

const mapStateToProps = state => ({
  text: state.SelectMyCarReducer.text,
  });
  const mapDispatchToProps =  {
   
    
    
}

export default connect(mapStateToProps,mapDispatchToProps)(StartMap);