import { RECEIVE_WEATHER } from '../actions/weather_actions';

const weatherReducer = (currentState = {}, action) => {
    Object.freeze(currentState);
    let newState = Object.assign({}, currentState);
    switch(action.type) {
        case RECEIVE_WEATHER:
            return action.weatherData.data.data.currently
        default:
            return currentState;
    }
};

export default weatherReducer;