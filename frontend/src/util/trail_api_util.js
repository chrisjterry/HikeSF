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

export const getUserTrails = userId => {
  return axios.get(`/api/trails/user/${userId}`)
}

export const deleteTrail = id => {
  return axios.delete(`/api/trails/${id}`)
}