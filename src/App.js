import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
  render() {
    return (
      <div id="root">
        <Header />
        <div id="main">
          {this.props.children}
        </div>
        <div id="footer">
          &copy; QuackRabbit 2017
        </div>
      </div>
    );
  }
}

export default App;
