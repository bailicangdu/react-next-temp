import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout.js';
import Router from 'next/router';

export default class About extends React.Component {
  componentDidMount() {
    console.log(Router.route)
  }
  render () {
    return (
      <div>
        welcome to About
        <Link href="/"><a> back to home</a></Link>
      </div>
    );
  }
}
