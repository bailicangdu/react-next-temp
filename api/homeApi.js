import Axios from './axios.js';

class HomeApi extends Axios {
  getCity = params => this.axios('/v1/cities', params);
  testssr = params => this.axios('http://localhost:1234/testssr', params);
}

export default new HomeApi();