import React from 'react';
import routeConfig from '../routes';
import styles from './index.css';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import About from './about'
import Home from './home'
import Article from './article'
import Posts from './posts'

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/about" component={About}/>
      <Route path="/" component={Home}/>
      <Route path="/home" component={Home}/>
      <Route path="/article" component={Article}/>
      <Route path="/posts" component={Posts}/>
    </div>
  </Router>
)

export default BasicExample