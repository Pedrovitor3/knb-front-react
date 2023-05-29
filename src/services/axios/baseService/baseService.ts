import axios from 'axios';
import { urlsServices } from '../../../configs/urlsConfig';

export const APIAnswer = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

export const APIAxle = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

export const APICard = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

export const APIComment = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

export const APIDemand = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

export const APIProfile = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

export const APIPhase = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

export const APIStage = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

export const APITag = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

export const APIUsersDemand = axios.create({
  baseURL: urlsServices.BACKENDWS,
});

APIDemand.interceptors.response.use(
  async response => response,
  error => {
    if (error.response.status === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);
