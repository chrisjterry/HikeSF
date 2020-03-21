import {
    RECEIVE_TRAIL_ERRORS,
    RECEIVE_TRAILS, 
    RECEIVE_TRAIL, 
    RECEIVE_NEW_TRAIL
  } from "../../src/actions/trail_actions";
  
  const _nullErrors = [];
  
  const TrailErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_TRAIL_ERRORS:
        return action.errors.response.data;
      case RECEIVE_TRAILS:
        return _nullErrors;
    case RECEIVE_TRAIL:
        return _nullErrors;
    case RECEIVE_NEW_TRAIL:
        return _nullErrors; 
      default:
        return state;
    }
};
  
export default TrailErrorsReducer;
  