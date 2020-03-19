import * as WeatherAPIUtil from '../util/weather_api_util';

export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';

const receiveWeather = weatherData => ({
    type: RECEIVE_WEATHER,
    weatherData
});

export const fetchWeather = weatherData => dispatch => (
    WeatherAPIUtil.fetchWeatherData(weatherData).then(
        weather => dispatch(receiveWeather(weather))
    )
);