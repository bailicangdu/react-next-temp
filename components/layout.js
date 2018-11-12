import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import '../style/base/base.less';

class Layout extends React.Component {
  backHome = () => {
    this.props.router.push('/about');
  }
  render() {
    const { children, title } = this.props;
    return (
      <div>
        <Head>
            <title>{ title }</title>
            <meta charSet="utf-8"/>
            <meta name="Description" content=""/>
            <meta name="renderer" content="webkit"/>
            <meta name="keywords" content=""/>
            <meta name="apple-mobile-web-app-title" content=""/>
            <meta name="wap-font-scale" content="no"/>
            <meta name="msapplication-tap-highlight" content="no"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
            <meta name="full-screen" content="yes"/>
            <meta name="screen-orientation" content="portrait"/>
            <meta name="x5-fullscreen" content="true"/>
            <meta name="x5-orientation" content="portrait"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="format-detection" content="telephone=no, email=no, address=no"/>
            <meta name="theme-color" content="#000000"/>
            <meta httpEquiv="x-dns-prefetch-control" content="on"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui" />
        </Head>
        <header>
          <nav>
            <Link href='/a'><a> a </a></Link>
            <Link href='/b'><a> b </a></Link>
          </nav>
        </header>
        <div onClick={this.backHome}>点击跳转about</div>
        { children }

        <footer>
          公共底部
        </footer>
      </div>
    );
  }
}


export default withRouter(Layout);