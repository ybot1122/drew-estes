import React, { Component } from 'react';

import Author from './Author';
import ArticleCard from './ArticleCard';
import BigQuote from './BigQuote';

import ArticleMetadata from './articlemetadata.json';

class Home extends Component {
  render() {
    const articleOne = ArticleMetadata['the-magic-marble-box'];
    return (
      <div className="container-fluid">
        <div className="row">
          <Author />
        </div>

        <div className="row">
          <ArticleCard title={articleOne.title} url={articleOne.url} publishDate={articleOne.published}>
            <p>As you go about your day &ndash; eating, sleeping, breathing, and doing whatever the hell you do with the rest of your time &ndash; you come upon a curious looking man. His head seems to resemble a duck. Or maybe a rabbit&hellip; you&apos;re not sure.</p>
            <img src={process.env.PUBLIC_URL + './images/articles/magic-marble-box/1.png'} />
            <p>The man shows you a box, which he tells you is full of marbles. He invites you to play a game where you must predict the percentages of the various marbles in the box. You can guess as many times as you want, but you can&apos;t remove the lid of the box to look inside &ndash; you can only take one handful of marbles at a time from the hole in the top, before putting them back to draw the next handful.</p>
            <p>Setting aside your reservations about listening to a guy who looks like your childhood nightmares and wants you to reach into a strange box, you decide to play. After all, he <span class="i">is</span> wearing a labcoat.</p>
          </ArticleCard>
        </div>
      </div>
    );
  }
}

export default Home;
