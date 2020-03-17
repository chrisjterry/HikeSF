import { connect } from "react-redux";
import { createTrail } from "../../actions/trail_actions";
import NewTrailForm from "./new_trail_form";

const mapStateToProps = state => {
    return {
        errors: state.errors.trailErrors
    };
};

const mapDispatchToProps = dispatch => {
    // debugger
    return {
        createTrail: trail => dispatch(createTrail(trail))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTrailForm);
