import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 no-gutter">
            <div className="article">
              <h3>Page Not Found!</h3>
              <p><Link to="/">Go back to homepage</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
