import React, { Component } from 'react';

import drew from './images/drew-hi.jpg';

import './styles/Author.css';

class Author extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMore: true,
    };
  }

  render() {
    const { showMore } = this.state;
    const more = showMore && (<p>Here we explore ideas about people and society, and discuss ways we can improve both ourselves and our communities. This involves letting go of the biases, habits, and misconceptions that hold us back, and developing our emotional intelligence. So whether it&apos;s through a lens of science and technology, media and politics, or psychology and human behavior, QuackRabbit exists to help you live a smarter, happier and healthier life.</p>);
    return (
        <div className="author-preview">
          <img src={drew} alt="author" className="author-image" />
          <h1>Hi, I&apos;m Drew.</h1>
          <h2>And this is QuackRabbit.</h2>
          {more}
          <p className="cta" onClick={() => this.setState({ showMore: !this.state.showMore })}>Open</p>
        </div>
      );
  }
}

export default Author;
