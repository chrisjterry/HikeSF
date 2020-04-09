import { connect } from 'react-redux';
import { fetchUserTrails, removeTrail } from '../../actions/trail_actions';
import Profile from './profile';

const mapStateToProps = state => ({
    trails: state.entities.trails.user,
    currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({
    fetchUserTrails: userId => dispatch(fetchUserTrails(userId)),
    removeTrail: id => dispatch(removeTrail(id))
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);