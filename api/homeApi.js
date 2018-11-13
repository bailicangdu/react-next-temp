import Axios from './axios.js';

class HomeApi extends Axios {
  getCity = (params, headers, serverside) => this.axios('get', '/v1/cities', params, headers, serverside);
  testssr = (params, headers) => this.axios('get', 'http://localhost:1234/testssr', params, headers);
}

export default new HomeApi();