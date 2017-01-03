import React, { Component } from 'react';

import patreonLogo from './images/patreon_logo.png';

class SupportPatreon extends Component {
  render() {
    return (
      <div className="article">
        <h3>Support on Patreon</h3>
        <img src={patreonLogo} alt="patreon logo" />
      </div>
    );
  }
}

export default SupportPatreon;