import * as WeatherAPIUtil from '../util/weather_api_util';

export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const RECEIVE_WEATHER_ERRORS = 'RECEIVE_WEATHER_ERRORS';

const receiveWeather = weatherData => ({
    type: RECEIVE_WEATHER,
    weatherData
});

const receiveWeatherErrors = errors => ({
    type: RECEIVE_WEATHER_ERRORS,
    errors
});

export const fetchWeather = weatherData => dispatch => WeatherAPIUtil.fetchWeatherData(weatherData)
    .then(weatherData => dispatch(receiveWeather(weatherData)))
    .catch(errors => console.log(errors));