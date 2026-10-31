
import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:5000/api',

  // Wait up to 5 minutes for AI generation
  timeout: 300000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === 'ECONNABORTED'
        ? 'The investigation is taking too long. Please try again.'
        : 'Could not reach the case server. Make sure the API is running and try again.');

    return Promise.reject(new Error(message));
  }
);

export const generateInvestigation = (payload) =>
  api.post('/investigations/generate', payload);

export const getInvestigation = (id) =>
  api.get(`/investigations/${id}`);

export const getEvidence = (id) =>
  api.get(`/investigations/${id}/evidence`);

export const getSuspects = (id) =>
  api.get(`/investigations/${id}/suspects`);

export const submitVerdict = (id, selectedSuspectId) =>
  api.post(`/investigations/${id}/verdict`, { selectedSuspectId });

export const getResult = (id) =>
  api.get(`/investigations/${id}/result`);
