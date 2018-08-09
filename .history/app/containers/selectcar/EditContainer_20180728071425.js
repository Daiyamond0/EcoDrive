import { connect } from 'react-redux';
import { Edit } from '../../components/selectcar/Edit';

const mapStateToProps = state => ({
    editdetail: state.EditCarReducer.editdetail,
    index: state.EditCarReducer.index
});

export default connect(mapStateToProps)(Edit);
