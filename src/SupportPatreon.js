import React, { Component } from 'react';

import patreonLogo from './images/patreon_logo.png';

class SupportPatreon extends Component {
  render() {
    return (
      <div className="article">
        <h3><a href="https://www.patreon.com/quackrabbit" target="_blank">Support QuackRabbit on Patreon!</a></h3>
        <p>Pledge today at <a href="https://www.patreon.com/quackrabbit" target="_blank">https://www.patreon.com/quackrabbit</a>.</p>
        <a href="https://www.patreon.com/quackrabbit"><img id="patreon-logo" src={patreonLogo} alt="patreon logo" target="_blank" /></a>
      </div>
    );
  }
}

export default SupportPatreon;