import { connect } from "react-redux";
import { fetchTrail } from "../../actions/trail_actions";
import TrailShow from "./trail_show";

const mapStateToProps = (state, ownProps) => {
  // debugger
  return {
    trail: state.entities.trails.current,
    // currentUser: state.entities.users[state.session.id]
    };
};

const mapDispatchToProps = dispatch => ({
  fetchTrail: id => dispatch(fetchTrail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrailShow);
