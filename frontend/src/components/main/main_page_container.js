import { connect } from "react-redux";
import MainPage from "./main_page";

const mapStateToProps = state => {
    return {
        currentUser: state.session.user
    }
};

export default connect(mapStateToProps)(MainPage);
