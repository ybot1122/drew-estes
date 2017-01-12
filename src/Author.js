import React, { Component } from 'react';

import drew from './images/drew-hi.jpg';

class Author extends Component {
  render() {
    return (
        <div className="author-preview col-xs-12">
            <img src={drew} alt="author" className="author-image" />
            <p>Hi, I&apos;m Drew. And this is QuackRabbit. Here I explore ideas about people and society, and offer ways we can improve both ourselves and our communities. This involves letting go of the biases, habits, and misconceptions that hold us back. So whether it&apos;s through science and technology, media and politics, or psychology and human behavior, QuackRabbit exists to help you live a smarter, happier and healthier life.</p>
            <p>Like what you read? Subscribe below and never miss an article. If you're feeling generous, support me on Patreon for as little as a dollar a month. It feeds my stomach as well as my motivation to write more.</p>
        </div>
      );
  }
}

export default Author;
