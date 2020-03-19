import { connect } from "react-redux";
import { fetchTrail } from "../../actions/trail_actions";
import { fetchWeather } from "../../actions/weather_actions";
import TrailShow from "./trail_show";

const mapStateToProps = (state, ownProps) => {
  // debugger
  return {
    trail: state.entities.trails.current,
    weather: state.entities.weather
    // currentUser: state.entities.users[state.session.id]
    };
};

const mapDispatchToProps = dispatch => ({
  fetchTrail: id => dispatch(fetchTrail(id)),
  fetchWeather: weather => dispatch(fetchWeather(weather))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrailShow);
