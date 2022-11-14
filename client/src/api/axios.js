import axios from 'axios';
import jsCookie from 'js-cookie';

// add token for authorization
axios.defaults.headers.common['x-auth-token'] = jsCookie.get('token');
const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

export default axiosApi;  