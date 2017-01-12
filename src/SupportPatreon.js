import React, { Component } from 'react';

import patreonLogo from './images/patreon_logo.png';

class SupportPatreon extends Component {
  render() {
    return (
      <div className="article">
        <h3>Support on Patreon</h3>
        <a href="https://www.patreon.com/quackrabbit"><img id="patreon-logo" src={patreonLogo} alt="patreon logo" /></a>
      </div>
    );
  }
}

export default SupportPatreon;