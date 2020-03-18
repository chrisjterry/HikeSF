import axios from 'axios';

export const fetchAllTrails = () => {
  return axios.get('/api/trails')
};

export const fetchOneTrail = id => {
  return axios.get(`/api/trails/${id}`)
};

export const createNewTrail = data => {
  debugger
  return axios.post('/api/trails/new', data)
}