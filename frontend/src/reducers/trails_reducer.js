import { RECEIVE_TRAILS, RECEIVE_TRAIL, RECEIVE_NEW_TRAIL, RECEIVE_USER_TRAILS } from '../actions/trail_actions';
  
const TrailsReducer = (state = { all: [], current: {}, user: [] }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_TRAILS:
        newState.all = action.trails.data;
        return newState;
      case RECEIVE_TRAIL:
        newState.current = action.trail.data;
        return newState;
      case RECEIVE_NEW_TRAIL:
        newState.all.push(action.trail.data);
        newState.current = action.trail.data;
        return newState;
      case RECEIVE_USER_TRAILS:
        newState.user = action.trails.data;
        return newState;
      default:
        return state;
    }
};
  
export default TrailsReducer;
