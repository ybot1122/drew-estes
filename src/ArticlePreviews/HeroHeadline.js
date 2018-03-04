import React, { Component } from 'react';
import { Link } from 'react-router'

import '../styles/ArticlePreviews/HeroHeadline.css';

class HeroHeadline extends Component {
  render() {
    const { title, author, imageDir, heroImg, url } = this.props;
    const linkToArticle = `/articles/${url}`;
    const backImg = `url('images/articles/${imageDir}/${heroImg}')`;

    return (
      <div className="heroheadline--outer">
        <div className="heroheadline--inner">
          <div className="title--container" style={{backgroundImage: backImg}}>
            <div className="title--text">
              <Link to={linkToArticle}>{title}</Link>
              <p className="title--text-author">By {author}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeroHeadline.propTypes = {
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  imageDir: React.PropTypes.string.isRequired,
  heroImg: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
};

export default HeroHeadline;
