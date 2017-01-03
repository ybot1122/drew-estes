import React, { Component } from 'react';

import drew from './images/drew-hi.jpg';
import toby from './images/toby-hi.jpg';

class About extends Component {
  render() {
    return (
      <div id="team" className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-6 no-gutter">
            <div className="article">
              <h2>Drew Estes</h2>
              <img src={drew} alt="drew estes" />
              <div className="bio">
                <p>Drew deals with the world the same way a toddler deals with bubbles: he's excited by everything new, chasing down ideas wherever the wind carries them. As a science and tech lover with a business background and a fascination with art and language, he's desperately trying to prove to himself that “jack of all trades, master of none” is a feasible life strategy.</p>
                <ul>
                  <li><span className="b">Current Media Binge:</span> “Crash Course World History” with John Green</li>
                  <li><span className="b">Spirit Animal:</span> Carl Sagan</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 no-gutter">
            <div className="article">
              <h2>Toby Liu</h2>
              <img src={toby} alt="toby liu" />
              <div className="bio">
                <p>Toby lives in the world of software and coding. He manages the website and sweats out the details when it comes to technical problems. The site is designed to be as accessible as possible, so viewers can quickly load and read content. He enjoys collaborating with other techies to brainstorm user experience trends and ideas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
