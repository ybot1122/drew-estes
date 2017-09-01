import React, { Component } from 'react';

import drew from './images/drew-hi.jpg';

class Author extends Component {
  render() {
    return (
        <div className="author-preview col-xs-12">
            <img src={drew} alt="author" className="author-image" />
            <p>Hi, I&apos;m Drew. And this is QuackRabbit. Here we explore ideas about people and society, and discuss ways we can improve both ourselves and our communities. This involves letting go of the biases, habits, and misconceptions that hold us back, and developing our emotional intelligence. So whether it&apos;s through a lens of science and technology, media and politics, or psychology and human behavior, QuackRabbit exists to help you live a smarter, happier and healthier life.</p>
        </div>
      );
  }
}

export default Author;
