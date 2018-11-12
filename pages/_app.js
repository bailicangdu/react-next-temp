import React from 'react'
import App, {Container} from 'next/app'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head';

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return (
      <Container>
        {/*
          由于title不能放在_document.js中，所以干脆将head放在_app.js中
          而且放在_document.js中的话，mate信息会放在script底下，不知道为什么
        */}
        <Head>
          <title>reacr-ssr</title>
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
        <div>
          <Link href='/'><a>Home</a></Link>
          <Link href='/about'><a>About</a></Link>
          <Link href='/forever'><a>Forever</a></Link>
          <Link href='/non-existing'><a>Non Existing Page</a></Link>
        </div>

        <Component {...pageProps} />
      </Container>
    )
  }
}
