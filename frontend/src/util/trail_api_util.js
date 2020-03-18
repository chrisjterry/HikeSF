import axios from 'axios';

export const fetchAllTrails = data => {
  return axios.get('/api/trails', { params: data })
};

export const fetchOneTrail = id => {
  return axios.get(`/api/trails/${id}`)
};

export const createTrail = data => {
  return axios.post('/api/trails', data)
}