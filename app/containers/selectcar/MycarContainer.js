import { connect } from 'react-redux'
import { MyCar } from '../../components/selectcar/Mycar'

import { MyCarlist } from '../../actions/selectcar/Mycar'
import {carDetail } from '../../actions/selectcar/Mycar';
import { EditDetail } from '../../actions/selectcar/EditCar'
const mapStateToProps = state => ({
  user: state.sessionReducer.user,
  mycar: state.MycarReducer.mycar,
  CarSelect: state.SelectMyCarReducer.CarSelect
})

const mapDispatchToProps = {
  MyCarlist: MyCarlist,
  carDetail:carDetail,
  EditDetail:EditDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCar)
