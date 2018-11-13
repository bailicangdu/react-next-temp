import React from 'react';
import Link from 'next/link';

export default class About extends React.Component {
  componentDidMount() {

  }
  render () {
    return (
      <div>
        welcome to About
        <Link href="/" prefetch><a> back to home</a></Link>
      </div>
    );
  }
}
