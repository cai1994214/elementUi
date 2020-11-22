
import axios from 'axios'
 
let base = '';
 
export const requestLogin = params => { return axios.post(`${base}/user/login`, params).then(res => res.data); };
export const requestList = params => { return axios.post(`${base}/news/index`, params).then(res => res.data); };