import React, { Component } from 'react';

import drew from './images/drew-hi.jpg';

class Author extends Component {
  render() {
    return (
        <div className="author-preview col-xs-12">
            <img src={drew} alt="author" className="author-image" />
            <p>You should hear me stumble through an explanation when people ask me this in person. On a good day I can put a nice little box around what this site is all about, only to realize afterward that not everything fits.</p>
            <p>In short, I don&apos;t really plan articles. I try to, but then I get distracted by a cool idea or question. Then I chase that idea or question down the rabbit hole of the Internet until it turns into an article.</p>
        </div>
      );
  }
}

export default Author;
