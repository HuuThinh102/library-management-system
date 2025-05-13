import axios from 'axios';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const baseurl = process.env.NEXT_PUBLIC_API_UR;

const instance = axios.create({
  baseURL: baseurl,
});

export default instance;
