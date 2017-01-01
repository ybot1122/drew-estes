import React, { Component } from 'react';
import { Link } from 'react-router'

import logo from'./images/logo_simple.jpg';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <div className="logo-container">
          <Link to="/" className="logo-link"><img id="logo" src={logo} alt="logo" /><h1>QuackRabbit</h1></Link>
        </div>
        <div className="nav-container">
          <Link to="/about" className="nav-button">About</Link>
          <Link to="/articles" className="nav-button">Articles</Link>
          <Link to="/about" className="nav-button">Photos</Link>
          <Link to="/about" className="nav-button">Support</Link>
        </div>
      </div>
    );
  }
}

export default Header;
