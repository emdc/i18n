import App from 'view/App';
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import i18n from '@emdc/i18n';


const renderApp = (AppComponent) => {
  const element = document.getElementById('root');

  if (!element) {
    throw new Error('Couldn\'t find element with id root');
  }

  i18n.setLanguage('en');
  i18n.setFallbackLanguage('en');

  ReactDOM.render(
    <AppContainer>
      <i18n.Provider>
        <AppComponent />
      </i18n.Provider>
    </AppContainer>,
    element
  );
};

(() => {
  renderApp(App);

  if (module.hot) {
    module.hot.accept('view/App', () => {
      /* eslint-disable global-require */
      const NextApp = require('view/App').default;
      /* eslint-disable global-require */

      renderApp(NextApp);
    });
  }
})();
