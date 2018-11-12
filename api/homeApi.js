import Axios from './axios.js';

class HomeApi extends Axios {
  getCity = (params, headers) => this.axios('get', 'http://127.0.0.1:8001/v1/cities', params, headers);
  testssr = (params, headers) => this.axios('get', 'http://localhost:1234/testssr', params, headers);
}

export default new HomeApi();