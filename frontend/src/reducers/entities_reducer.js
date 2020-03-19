import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import trailsReducer from './trails_reducer';
import reviewsReducer from './reviews_reducer';
import weather from './weather_reducer';

export default combineReducers({
    users: usersReducer,
    trails: trailsReducer,
    reviews: reviewsReducer,
    weather
});
