import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import trailErrors from './trail_errors_reducer'

export default combineReducers({
    sessionErrors: SessionErrorsReducer,
    trailErrors
});
