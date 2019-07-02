import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import i18n from '@emdc/i18n';


class App extends React.Component {
  constructor (props) {
    super(props);

    i18n.actions.changeTranslationsByLocale({test: 'Test label'}, 'en');
    i18n.actions.changeTranslationsByLocale({test: 'Тестовая надпись'}, 'ru');
    i18n.actions.changeLocale('en');
  }

  setLocale (locale) {
    i18n.actions.changeLocale(locale);
  }

  render () {
    const {translate} = this.props;

    return (
      <div>
        <div>
          <button onClick={() => this.setLocale('en')}>{'Switch to English'}</button>
          <button onClick={() => this.setLocale('ru')}>{'Переключиться на русский язык'}</button>
        </div>
        <div>
          {translate('test')}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  translate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  translate: i18n.getTranslatorFromState(state)
});

export default connect(mapStateToProps, {})(App);
