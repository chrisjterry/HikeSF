import axios from 'axios';

export const fetchTrails = () => {
  return axios.get('/api/trails')
};

export const fetchTrail = id => {
  return axios.get(`/api/trails/${id}`)
};

export const createTrail = data => {
  return axios.post('/api/trails', data)
}