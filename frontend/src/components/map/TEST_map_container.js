import { connect } from "react-redux";
import { fetchTrails } from "../../actions/trail_actions";
import IndexMap from "./index_map";

const mapStateToProps = state => {
  return {
    trails: state.entities.trails.all
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrails: data => dispatch(fetchTrails(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
