import { connect } from 'react-redux'
import { MyCar } from '../../components/selectcar/Mycar'

import { MyCarlist } from '../../actions/selectcar/Mycar'
import {carDetail } from '../../actions/selectcar/Mycar';
const mapStateToProps = state => ({
  user: state.sessionReducer.user,
  mycar: state.MycarReducer.mycar,
  CarSelect: state.SelectMyCarReducer.CarSelect
})

const mapDispatchToProps = {
  MyCarlist: MyCarlist,
  carDetail:carDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCar)
