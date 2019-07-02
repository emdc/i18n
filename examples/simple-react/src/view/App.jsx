import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import i18n from '@emdc/i18n';


class App extends React.Component {
  constructor (props) {
    super(props);

    // Save translations
    i18n.actions.changeTranslation(this.constructor.name, {test: 'Test label'}, 'en');
    i18n.actions.changeTranslation(this.constructor.name, {test: 'Тестовая надпись'}, 'ru');

    // Set current locale
    i18n.actions.changeLocale('en');

    // Create translator for this component
    this.translate = (label) => this.props.translate(this.constructor.name, label);
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={() => i18n.actions.changeLocale('en')}>{'Switch to English'}</button>
          <button onClick={() => i18n.actions.changeLocale('ru')}>{'Переключиться на русский язык'}</button>
        </div>
        <div>
          {'Translated label: '}
          {this.translate('test')}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  translate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  translate: i18n.getLabel(state)
});

export default connect(mapStateToProps, {})(App);
