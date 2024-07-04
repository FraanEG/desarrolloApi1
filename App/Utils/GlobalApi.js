import axios from 'axios';

export let token = null;
const wipeToken = () => {token = null}

const baseURL = 'http://10.0.2.2:5000/';

const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(
  config => {
    if (token) 
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => Promise.reject(error)
);

const getBarrios = async () => {
  const response = await axiosInstance.get('/vecino/barrios');
  return response.data;
};

const getRubros = async () => {
  const response = await axiosInstance.get('/comercio/rubros');
  return response.data;
};

const getReclamos = async () => {
  const response = await axiosInstance.get('/reclamo');
  return response.data;
};

const getComercios = async () => {
  const response = await axiosInstance.get('/comercio');
  return response.data;
};

const postLoginVecino = async (dni, password) => {
  const response = await axiosInstance.post('/vecino/login', { dni, pw: password });
  token = response.data;
  return response.data;
};

const getMeVecino = async () => {
  const response = await axiosInstance.get('/vecino/me');
  return response.data;
};

const patchUpdateVecino = async (password) => {
  const response = await axiosInstance.patch(`/vecino/${password}`);
  return response.data;
};

const postLoginPersonal = async (legajo, password) => {
  const response = await axiosInstance.post('/personal/login', { legajo, pw: password });
  token = response.data;
  return response.data;
};

const getMePersonal = async () => {
  const response = await axiosInstance.get('/personal/me');
  return response.data;
};

const postDenuncia = async (obj) => {
  const response = await axiosInstance.post('/denuncia', obj);
  return response.data;
};

const postMovimientoDenuncia = async (denunciaId, obj) => {
  const response = await axiosInstance.post(`/denuncia/${denunciaId}`, obj);
  return response.data;
};

const postReclamo = async (obj) => {
  const response = await axiosInstance.post('/reclamo', obj);
  return response.data;
};

const postMovimientoReclamo = async (reclamoId, obj) => {
  const response = await axiosInstance.post(`/denuncia/${reclamoId}`, obj);
  return response.data;
};

const postComercio = async (obj) => {
  const response = await axiosInstance.post('/comercio', obj);
 return response.data;
};

const deleteComercio = async (id) => {
  const response = await axiosInstance.delete(`/comercio/${id}`);
  return response.data;
};

const postOferta = async (comercioId, obj) => {
  const response = await axiosInstance.post(`/comercio/${comercioId}`, obj);
  return response.data;
};

const deleteOferta = async (ofertaId) => {
  const response = await axiosInstance.delete(`/comercio/oferta/${ofertaId}`);
  return response.data;
};

export default{
  getBarrios,
  getRubros,
  getReclamos,
  getComercios,
  postDenuncia,
  postMovimientoDenuncia,
  postReclamo,
  postMovimientoReclamo,
  postComercio,
  deleteComercio,
  postOferta,
  deleteOferta,
  postLoginVecino,
  getMeVecino,
  patchUpdateVecino,
  postLoginPersonal,
  getMePersonal,
  wipeToken
}