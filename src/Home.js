import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Author from './Author';
import HeroHeadline from './ArticlePreviews/HeroHeadline';
import MailingListForm from './MailingListForm';
import MiniArticlesGrid from './MiniArticles/MiniArticlesGrid';
import SupportPatreon from './SupportPatreon';
import ArticleMetadata from './articlemetadata.json';

class Home extends Component {

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  render() {
    const articleOne = ArticleMetadata['whirlpools'];
    const { title, url, author, heroImg, imageDir } = articleOne;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 no-gutter">
            <HeroHeadline
              title={title}
              url={url}
              author={author}
              heroImg={heroImg}
              imageDir={imageDir} />
          </div>
        </div>


        <div className="row">
          <div className="col-xs-12 col-sm-8 no-gutter">
            <Author />
          </div>
          <div className="col-xs-12 col-sm-4 no-gutter">
            <MiniArticlesGrid initArticle={this.props.params && this.props.params.miniArticleTitle} />
          </div>
        </div>


        <div className="row">
          <div className="col-xs-12 col-sm-6 no-gutter">
            <MailingListForm />
          </div>
          <div className="col-xs-12 col-sm-6 no-gutter">
            <SupportPatreon />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  params: React.PropTypes.shape({
    miniArticleTitle: React.PropTypes.string,
  }).isRequired,
}

export default Home;
