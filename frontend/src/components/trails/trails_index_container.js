import TrailsIndex from "./trails_index";
import { fetchTrails, fetchTrail } from "../../actions/trail_actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  trails: state.entities.trails.all
});

const mapDispatchToProps = dispatch => ({
  fetchTrails: () => dispatch(fetchTrails()),
  fetchTrail: id => dispatch(fetchTrail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrailsIndex);
