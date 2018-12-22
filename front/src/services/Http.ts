import axios, {AxiosPromise, AxiosRequestConfig} from 'axios';

export default class Http {

    /**
     * Get the backend address.
     */
    static getBackend() {
        return process.env.VUE_APP_URL;
    }

    static request(config: AxiosRequestConfig): AxiosPromise {
        config.url = `${Http.getBackend()}/${config.url}`;
        return axios(config);
    }
}