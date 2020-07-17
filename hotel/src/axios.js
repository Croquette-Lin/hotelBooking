import axios from 'axios';
import url from 'url';
import router from './router'
import { config } from 'process';
import { Store } from 'vuex';
import qs from 'qs';
//创建axios实例
var instance = axios.create({
    baseURL: '/api',
    headerss: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});
instance.interceptors.request.use(
    config => {
        if (store.state.token) config.headers['User-Token'] = store.state.token
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
        }
        return config;
    },
    error => {
        console.log(error.response);
        return Promise.reject(error);
    });

instance.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        if (response.data.code) {
            switch (response.data.code) {
                case 1002:
                    store.state.isLogin = false
                    router.replace({
                        path: 'login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
            }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        // return "登录错误";
        console.log(error.response);
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })
export default instance;