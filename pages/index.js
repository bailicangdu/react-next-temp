import React from 'react';
import Link from 'next/link';
import HomeApi from '../api/homeApi.js';
import '../style/index.less';

class Home extends React.Component {
  static async getInitialProps({ pathname, query, asPath, req, res, jsonPageRes, err }) {
    const testdata = await HomeApi.testssr({ type: 'guess' }, req && req.headers || {});
    const cityObj = {} //await HomeApi.getCity({ type: 'group' }, {}, !Boolean(req));
    let city = [];
    Object.keys(cityObj).forEach((key) => {
      city = city.concat(cityObj[key]);
    });
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent, city, testdata };
  }
  state = {
    city: {},
    counter: 0,
  }
  handleClick = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }))
  }
  async initData() {
    const city = await HomeApi.getCity({ type: 'guess' });
    this.setState({
      city,
    })
  }
  componentDidMount() {
    console.log(11111)
    // this.initData();
  }
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!')
    }
    return (
      <div title="首页">
        <Link href={{ pathname: '/about', query: { name: 'Zeit' } }} scroll={false} prefetch><a>about</a></Link>
        <Link href={{ pathname: '/a', query: { name: 'a' } }}><a> a </a></Link>
        <Link href={{ pathname: '/b', query: { name: 'b' } }}><a> b </a></Link>
        <p>scoped</p>
        {/*<img src="/static/images/test-img.jpg" className="test-img" alt=""/>*/}
        <div className="userAgent">{this.props.userAgent}</div>
        {
          this.props.city.map((item, index) => {
            return <span className="city" key={index}>{item.name}</span>
          })
        }
        <div>{JSON.stringify(this.props.testdata)}</div>
        <h1 onClick={this.handleClick}>{this.state.counter}</h1>
      </div>
    );
  }
}

export default Home;