import cowsay from 'cowsay-browser';
import Head from 'next/head';
import '../style/index.less';

export default () =>
  <div>
    <Head>
      <meta charset="utf-8"/>
      <meta name="Description" content=""/>
      <meta name="renderer" content="webkit"/>
      <meta name="keywords" content=""/>
      <meta name="apple-mobile-web-app-title" content=""/>
      <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
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
      <meta http-equiv="x-dns-prefetch-control" content="on"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <title>标题</title>
    </Head>
    Hello world
    <p>scoped</p>
    <img src="/static/images/test-img.jpg" className="test-img" alt=""/>
    <div className="aa"></div>
  </div>