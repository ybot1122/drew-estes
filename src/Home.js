import React, { Component } from 'react';

import Author from './Author';
import ArticleCard from './ArticleCard';
import BigQuote from './BigQuote';

import ArticleMetadata from './articlemetadata.json';

class Home extends Component {
  render() {
    const articleOne = ArticleMetadata['the-implications-of-wanderlust'];
    const articleTwo = ArticleMetadata['taste-of-south-india'];
    return (
      <div className="container-fluid">
        <div className="row">
          <Author />
        </div>

        <div className="row">
          <ArticleCard title={articleOne.title} url={articleOne.url} publishDate={articleOne.published}>
            <BigQuote author="Carl Sagan">Despite all its material advantages, the sedentary life has left us&hellip; edgy. Unfulfilled. Even after 400 generations in villages and cities, we haven&apos;t forgotten. The open road still softly calls, like a nearly forgotten song of childhood.</BigQuote>
            <p>You&apos;ve felt it before. The restless itch arising in the middle of a long afternoon. The vague sense of wonder, of longing, as you look across an open landscape. The urge to move. To explore. To discover. To break out of your routine and remind yourself how to experience the world. To indulge these feelings in spite of every clich&egrave; surrounding them.</p>
            <p>Wanderlust. The Travel Bug. Whatever words you use to describe the feeling, it stirs deep within you like a hungry animal catching the scent of its next meal. Over millions of years, this drive to explore the unknown has kept our species alive. A drive not just to wander, but to investigate and understand the unknown, to explain the mysteries we come across. To learn and improve with each new discovery.</p>
          </ArticleCard>

          <ArticleCard title={articleTwo.title} url={articleTwo.url} publishDate={articleTwo.published}>
            <p>It&apos;s been a while since my last post, and anyone trying to follow my travels is mainly doing so through my Facebook, Instagram, or Snapchat. The posts here have been more a means to practice writing, but I realize many friends and family members just want a better idea of what I&apos;m doing, how I&apos;m traveling, what the country is like, etc. So this post is mainly dedicated to filling everyone in, as well as providing my impressions of the country. If that&apos;s not the type of post you want to read, you can go ahead and skip this one.</p>
            <p>I spent a fair amount of time preparing myself for the things I might deal with in India, only to find my most pressing questions in the beginning were things such as &ldquo;how the hell do I cross the street here?&rdquo; and &ldquo;why is everyone staring so much?&rdquo; As it turns out, when you&apos;re one of the only (and sometimes <span className="italicized">the</span> only) white people in a city, you tend to stand out. Many children and teens here have never seen a foreigner before.</p>
            <p>There&apos;s a lot to cover, much of which I&apos;m just going to gloss over, so you&apos;re welcome to ask for more details if you&apos;re curious. I divided this post into sections, so you can read the parts you&apos;re most interested in. Apologies for the nearly nonexistent transitions. Without further ado&hellip;</p>
          </ArticleCard>
        </div>
      </div>
    );
  }
}

export default Home;
