
import { AxiosRequestConfig } from 'axios';

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: 'https://official-joke-api.appspot.com',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};