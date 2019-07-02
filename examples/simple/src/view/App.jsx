import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import i18n from '@emdc/i18n';


class App extends React.Component {
  constructor (props) {
    super(props);

    i18n.actions.changeComponentTranslation(this,{test: 'Test label'}, 'en');
    i18n.actions.changeComponentTranslation(this,{test: 'Тестовая надпись'}, 'ru');
    i18n.actions.changeLocale('en');

    this.translate = (label) => this.props.translate(this, label);
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={() => i18n.actions.changeLocale('en')}>{'Switch to English'}</button>
          <button onClick={() => i18n.actions.changeLocale('ru')}>{'Переключиться на русский язык'}</button>
        </div>
        <div>
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
