import * as React from 'react';
import i18n from '@emdc/i18n';


const translationsComp = {
  en: {
    test: 'Component label'
  },
  ru: {
    test: 'Текст Comp'
  }
};

const translationsApp = {
  en: {
    test: 'App label',
    switchTo: {
      en: 'Switch to English',
      ru: 'Переключиться на русский язык',
      de: 'Wechseln Sie zu Deutsch'
    }
  },
  ru: {
    test: 'Текст App',
    switchTo: {
      en: 'Switch to English',
      ru: 'Переключиться на русский язык',
      de: 'Wechseln Sie zu Deutsch'
    }
  },
  de: {
    test: 'Inschrift App',
    switchTo: {
      en: 'Switch to English',
      ru: 'Переключиться на русский язык',
      de: 'Wechseln Sie zu Deutsch'
    }
  }
};

const Comp = i18n.localize(translationsComp, 'Comp')(({translate}) => (
  <div>
    {translate('test')}
  </div>
));


@i18n.localize(translationsApp)
class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {translate} = this.props;

    return (
      <div>
        <div>
          <button onClick={() => i18n.setLocale('en')}>{App.translate('switchTo.en')}</button>
          <button onClick={() => this.props.setLocale('ru')}>{translate('switchTo.ru')}</button>
          <button onClick={() => i18n.setLocale('de')}>{i18n.translate('App', 'switchTo.de')}</button>
        </div>
        <div>
          {`Translated label from class: ${App.translate('test')}`}
          <br />
          {`Translated label from props: ${translate('test')}`}
          <br />
          {`Specified locale: ${translate('test', 'de')}`}
          <Comp />
        </div>
      </div>
    );
  }
}

export default App;
