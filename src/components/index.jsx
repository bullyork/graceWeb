import React from 'react';
import routeConfig from '../routes';
import styles from './index.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import LoadAbout from './about'
import LoadHome from './home'
import LoadArticle from './article'
import LoadPosts from './posts'
import LazilyLoad from './lazilyload'
import {
  importLazy,
  LazilyLoadFactory
} from './lazilyload'

const About = () => (
  <LazilyLoad modules={{
    About: () => importLazy(import('./about')),
  }}>
  {({About}) => (
    <About/>
  )}
  </LazilyLoad>
)

const Home = () => (
  <LazilyLoad modules={{
    Home: () => importLazy(import('./home')),
  }}>
  {({Home}) => (
    <Home/>
  )}
  </LazilyLoad>
)

const Article = () => (
  <LazilyLoad modules={{
    Article: () => importLazy(import('./article')),
  }}>
  {({Article}) => (
    <Article/>
  )}
  </LazilyLoad>
)

const Posts = () => (
  <LazilyLoad modules={{
    Posts: () => importLazy(import('./posts')),
  }}>
  {({Posts}) => (
    <Posts/>
  )}
  </LazilyLoad>
)
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