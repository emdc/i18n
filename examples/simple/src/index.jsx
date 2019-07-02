import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import App from 'view/App';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import i18n from '@emdc/i18n';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ...i18n.reducers
  }),
  {},
  composeEnhancers(applyMiddleware(thunk))
);

const renderApp = (AppComponent, storeObj) => {
  const element = document.getElementById('root');

  if (!element) {
    throw new Error('Couldn\'t find element with id root');
  }

  i18n.connect(storeObj);

  ReactDOM.render(
    <AppContainer>
      <Provider store={storeObj}>
        <AppComponent />
      </Provider>
    </AppContainer>,
    element
  );
};

(() => {
  renderApp(App, store);

  if (module.hot) {
    module.hot.accept('view/App', () => {
      /* eslint-disable global-require */
      const NextApp = require('view/App').default;
      /* eslint-disable global-require */

      renderApp(NextApp, store);
    });
  }
})();
