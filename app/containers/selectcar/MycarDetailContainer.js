import { connect } from 'react-redux'
import { MycarDetail} from '../../components/selectcar/MycarDetail'



import {carDetail } from '../../actions/selectcar/Mycar';



const mapStateToProps = state => ({
    carinfo:state.MycarReducer.carinfo,
    user: state.sessionReducer.user,
})

const mapDispatchToProps = {
    carDetail:carDetail
  }

export default connect(mapStateToProps,mapDispatchToProps)(MycarDetail)