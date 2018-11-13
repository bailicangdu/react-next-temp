import dynamic from 'next/dynamic';
import React from 'react'; 
import Link from 'next/link';

const DynamicComponentWithCustomLoading = dynamic(
  import('../components/ca'),
  {
    loading: () => <p>...</p>
  }
)

export default class B extends React.Component {
  state = {
    showC: false,
  }
  render() {
    return (
      <div>
        {this.state.showC ? <DynamicComponentWithCustomLoading /> : null}
        <Link href="/"><a> back to home</a></Link>
        <p onClick={() => {this.setState({showC: true})}}>PAGE B is here!</p>
      </div>
    );
  }
} 
