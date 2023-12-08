/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import Cookies from 'js-cookie';
// import dotenv from "dotenv";

// dotenv.config();
// const apiUrl = "http://localhost:5000/api/v1";
const accessToken = Cookies.get('access');

const ApiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1" ,
  headers: {
    common: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  },
});

ApiClient.interceptors.request.use(
  //@ts-expect-error
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // switch (error.response && error.response.status) {
    //   case 401:
    //     history.replace({ pathname: '/'});
    //     break;
    //   case 404:
    //     history.replace({ pathname: '/404' });
    //     break;
    //   default:
    //     history.replace({ pathname: '/500' });
    //     break;
    // }

    return Promise.reject(error);
  }
);

export default ApiClient;
