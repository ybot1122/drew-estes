import React, { Component } from 'react';

import Author from './Author';
import ArticleCard from './ArticleCard';
import MailingListForm from './MailingListForm';
import SupportPatreon from './SupportPatreon';

import ArticleMetadata from './articlemetadata.json';

class Home extends Component {
  render() {
    const articleOne = ArticleMetadata['vipassana-experience'];
    return (
      <div className="container-fluid">
        <div className="row">
          <Author />
        </div>

        <div className="row">
          <ArticleCard title={articleOne.title} url={articleOne.url} publishDate={articleOne.published}>
            <h2 className="subtitle">{articleOne.subtitle}</h2>
            <img style={{"maxHeight": "none"}} src="images/articles/vipassana-experience/hero.jpg" alt="Silence" />
            <div className="caption">&ldquo;This will end in either enlightenment or insanity.&rdquo; (Image <a href="https://s-media-cache-ak0.pinimg.com/originals/52/4b/3e/524b3e8c3fd1b1a24c923827fe1c323c.jpg">source</a>)</div>
            <p>If you&apos;re like most people, you try to avoid inactivity. The thought of sitting still with nothing to entertain you sounds unpleasant at best: you experience anything from a vague sense of unease to full-on boredom or anxiety in the absence of something to distract you, calm you, or stimulate your mind.</p>
            <p>If this sounds accurate, than the thought of a meditation retreat &ndash; ten days without phones, music, movies, books, computers, beer, conversation, or any other distraction &ndash; probably sounds unthinkable. In recent months though, I learned more about Vipassana, or insight meditation, and felt intrigued by the chance to test my limits at such a retreat. The mental challenges and rewards offered by the experience sparked a curiosity that grew like a wildfire within me. So during a stay in northern Thailand I signed up before I could talk myself out of it.</p>
            <p>Before we get into lessons from the experience however, let&apos;s make sure you know what you&apos;re getting yourself into.</p>
          </ArticleCard>
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

export default Home;
