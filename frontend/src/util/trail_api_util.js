import axios from 'axios';

export const fetchAllTrails = data => {
  return axios.get('/api/trails', { params: data })
};

export const fetchOneTrail = id => {
  return axios.get(`/api/trails/${id}`)
};

export const createNewTrail = data => {
  return axios.post('/api/trails/new', data)
}