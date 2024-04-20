import axios from "axios";
import {useUserStore} from "../store/user";
import {NO_DEEL_RESPONSE_APIS, UNNEEDED_TOKEN_APIS} from "./apis";
import {isBlank} from "../utils/strings";
import Taro from "@tarojs/taro";
import {infoToast} from "../utils/showToast";
const userStore = useUserStore()

const request = axios.create({
    baseURL: process.env.TARO_APP_API,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    },
    responseType: "json",
});

const netErrorToast = () => {
    infoToast('网络好像有一点问题，请稍后再试吧 ~')
}


request.interceptors.request.use(
    config => {
        if (UNNEEDED_TOKEN_APIS.includes(config.url)) {
            console.debug('无需token放行：' + config.url);
            return config;
        }
        const token = userStore.token;
        if (isBlank(token)) {
            infoToast('该操作需要您登录')
            Taro.navigateTo({
                url: '@/pages/login/index',
            })
            return
        }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        netErrorToast()
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        if (NO_DEEL_RESPONSE_APIS.includes(response.config.url)) {
            return response.data;
        }
        const responseData = response.data;
        const { code, data, msg } = responseData;
        if (code !== 0) {
            if (code === 3004) {
                Taro.navigateTo({
                    url: '/pages/login/index',
                }).then(() => {
                    infoToast(msg)
                })
                return
            }
            infoToast(msg)
            return Promise.reject(new Error(msg));
        }
        return data;
    },
    error => {
        netErrorToast()
        return Promise.reject(error);
    }
);

export default request;
