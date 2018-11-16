import React from 'react';
import Link from 'next/link';
import HomeApi from '../api/homeApi.js';
import '../styles/index.less';
import getConfig from 'next/config';
import { testAdd } from '../redux/actions';
import { connect } from 'react-redux';

@connect(state => state.testReducer, {testAdd})
class Home extends React.Component {
  static async getInitialProps({ pathname, query, asPath, req, res, jsonPageRes, err, store, isServer }) {
    try {
      const testdata = {} 
      // await HomeApi.testssr({ 
      //   type: 'guess',
      //   headers: req && req.headers,
      // });
      const cityObj = await HomeApi.getCity({ type: 'hot' });
      let city = [];
      Object.keys(cityObj).forEach((key) => {
        city = city.concat(cityObj[key]);
      });
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
      // 
      store.dispatch(testAdd(store.getState().testReducer.count))
      // console.log(getConfig());
      return { userAgent, city, testdata };
    } catch (e) {
      console.log(e);
      return {};
    }
  }
  constructor(props) {
    super(props);
    console.log('constructor');
  }
  state = {
    city: {},
    counter: 0,
  }
  handleClick = () => {
    this.setState(({ counter }: any) => ({
      counter: counter + 1
    }))
  }
  handleReduxClick = () => {
    this.props.testAdd(this.props.count);
  }
  async initData() {
    const city = await HomeApi.getCity({ type: 'guess' });
    this.setState({
      city,
    })
  }
  componentDidMount() {
    console.log('componentDidMount');
    // this.initData();
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }
  componentWillMount() {
    console.log('componentWillMount');
  }
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!')
    }
    console.log('render');
    const { city = [], testdata = '', userAgent = '', count, testcount } = this.props;
    return (
      <div title="首页">
        <Link href={{ pathname: '/about', query: { name: 'Zeit' } }} scroll={false} prefetch><a>about</a></Link>
        <Link href={{ pathname: '/a', query: { name: 'a' } }}><a> a </a></Link>
        <Link href={{ pathname: '/b', query: { name: 'b' } }}><a> b </a></Link>
        <p>scoped</p>
        <img src="/static/images/test-img.jpg" className="test-img" alt=""/>
        <div className="userAgent">{userAgent}</div>
        {
          city.map((item, index) => {
            return <span className="city" key={index}>{item.name}</span>
          })
        }
        <div>{JSON.stringify(testdata)}</div>
        <h1 onClick={this.handleClick}>{this.state.counter}</h1>
        <h1 onClick={this.handleReduxClick}>{this.props.count}</h1>
        {process.env.NODE_ENV}
        {process.env.BACKEND_URL}
        {process.env.BACKEND_URL}
      </div>
    );
  }
}


export default Home