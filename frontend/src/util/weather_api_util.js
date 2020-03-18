import axios from 'axios';

export const fetchWeatherData = weatherData => {
    return axios.post('/api/weather', weatherData);
};