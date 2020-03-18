import { RECEIVE_WEATHER } from '../actions/weather_actions';

const WeatherReducer = (currentState = {}, action) => {
    Object.freeze(currentState);
    let newState = Object.assign({}, currentState);
    switch(action.type) {
        case RECEIVE_WEATHER:
            newState.currentState = action.weather.weatherData;
            return newState;
        default:
            return currentState;
    }
};

export default WeatherReducer;