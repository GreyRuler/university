import axios from "axios";

const axiosClient =axios.create({
    baseURL: `/api`
})

axiosClient.interceptors.request.use(config => {
    const queryParams = {
        connectionName: localStorage.getItem('connectionName'),
    };

    config.params = {
        ...config.params,
        ...queryParams,
    };

    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosClient
