import { connect } from 'react-redux';
import { MyCar } from '../../components/selectcar/Mycar';

const mapStateToProps = state => ({
     user: state.sessionReducer.user,
  });

  const mapDispatchToProps =  {
  }


export default connect(mapStateToProps,mapDispatchToProps)(MyCar);