import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import App from './App';
import Home from './Home';
import Admin from './Admin';
import About from './About';
import ArticlesList from './ArticlesList';
import Article from './Article';
import Support from './Support';
import NotFound from './NotFound';

import './styles/normalize.css';
import './styles/grid.css';
import './styles/main.css';
import './styles/headerfooter.css';
import './styles/modal.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="support" component={Support} />
      <Route path="articles">
        <IndexRoute component={ArticlesList} />
        <Route path=":articleTitle" component={Article} />
      </Route>
      <Route path="miniarticles">
        <IndexRedirect to="/" />
        <Route path=":miniArticleTitle" component={Home} />
      </Route>
      <Route path="admin" component={Admin} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('root')
);
