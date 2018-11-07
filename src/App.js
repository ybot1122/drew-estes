import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
  render() {
    const { location: { pathname }} = this.props;
    const mainStyle = {
      maxWidth: (pathname === '/') ? null : '800px',
    };
    return (
      <div id="root">
        <Header />
        <div id="main" style={mainStyle}>
          {this.props.children}
        </div>
        <div id="footer">
          &copy; QuackRabbit 2019
        </div>
      </div>
    );
  }
}

export default App;
