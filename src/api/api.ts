import axios from 'axios';
import { CookiesService } from '../service/cookies.services';
import { TokenType } from '../bases/enums/jwt.enum';
import toast from 'react-hot-toast';

const publicApi = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const privateApi = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

publicApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response.status;
        if (status === 401){
            console.log('Invalid session. Please login again');
        }
        return Promise.reject(error);
    },
);

privateApi.interceptors.request.use(
    (config) => {
        const token = CookiesService.getToken(TokenType.ACCESS_TOKEN);
        if( token && config['headers']){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

privateApi.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const status = error.response.status;
        if(status === 401){
            toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            CookiesService.removeCookie(TokenType.ACCESS_TOKEN.toString());
            CookiesService.removeCookie(TokenType.REFRESH_TOKEN.toString());
        }
        const data = error.response?.data;
        console.log("API Error", data)
        toast.error(JSON.stringify(data.message))
        return Promise.reject({
            message: data.message,
            status
        })
    },
);

export { publicApi, privateApi };