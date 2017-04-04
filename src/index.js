import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
import store from './stores';
import App from './components';
import { Provider } from 'react-redux';

const render = (Component) => {
  let routerId = 0
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if(module.hot){
  module.hot.accept('./components/', () => {
    render(App)
  });
}
