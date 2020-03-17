import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import trails from './trails_reducer'

export default combineReducers({
    users: usersReducer,
    trails
});
