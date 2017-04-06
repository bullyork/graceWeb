import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import About from './about'
import Home from './home'
import Article from './article'
import Posts from './posts'
import NoMatch from './common/noMatch'
import './index.css'
import './animate.css'
const App = () => (
  <Router>
    <Switch>
      <Route path="/about" component={About}/>
      <Route exact path="/" component={Home}/>
      <Route path="/home" component={Home}/>
      <Route path="/article" component={Article}/>
      <Route path="/posts" component={Posts}/>
      <Route component={NoMatch}/>
    </Switch>
  </Router>
)

export default App