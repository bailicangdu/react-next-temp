import Axios from './axios.js';

class HomeApi extends Axios {
  getCity = params => this.axios('/v1/cities', params);
  testssr = params => this.axios('http://localhost:1234/testssr', params);
  graphql = params => this.axios('http://localhost:8009/graphql', params);
}

export default new HomeApi();
