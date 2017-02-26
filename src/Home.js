import React, { Component } from 'react';

import Author from './Author';
import ArticleCard from './ArticleCard';
import MailingListForm from './MailingListForm';
import SupportPatreon from './SupportPatreon';

import ArticleMetadata from './articlemetadata.json';

class Home extends Component {
  render() {
    const articleOne = ArticleMetadata['how-to-behave-in-trump-america'];
    return (
      <div className="container-fluid">
        <div className="row">
          <Author />
        </div>

        <div className="row">
          <ArticleCard title={articleOne.title} url={articleOne.url} publishDate={articleOne.published}>
            <img style={{"maxHeight": "none"}} src="images/articles/how-to-behave-in-trump-america/hero.png" />
            <div class="caption">Protesters march during the Women&apos;s March on Washington. Image Credit: Aaron P. Bernstein / Getty Images</div>
            <p>Sit down, America. You&apos;re sitting already? Okay good. It&apos;s time we pull our heads out of our collective asses.</p>
            <p>Yeah, we did it. Donald Trump is now the president of the United States. And he has put together one of the least educated administrations in modern history. Whether you&apos;re a woman, a minority, an immigrant, or really anything but an upper class straight white male, you already know you have cause for concern. No, I take that back &ndash; if you also happen to fall in the category of &ldquo;living on a planet affected by climate change,&rdquo; you should also be worried.</p>
            <p>Two things are apparent now:</p>
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
