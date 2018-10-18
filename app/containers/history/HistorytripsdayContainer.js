import { connect } from 'react-redux';
import { HistoryTripsday } from '../../components/history/HistoryTripsday';


const mapStateToProps = state => ({
    user: state.sessionReducer.user,
   trips: state.HistoryReducer.trips 
});
const mapDispatchToProps = {
  
  }

export default connect(mapStateToProps,mapDispatchToProps)(HistoryTripsday);
