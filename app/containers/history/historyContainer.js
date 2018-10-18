import { connect } from 'react-redux';
import { History } from '../../components/history/history';
import {HistoryTripsDay} from '../../actions/history/HistoryTrips' 

const mapStateToProps = state => ({
    user: state.sessionReducer.user,
   
});
const mapDispatchToProps = {
  HistoryTripsDay:HistoryTripsDay
  }

export default connect(mapStateToProps,mapDispatchToProps)(History);
