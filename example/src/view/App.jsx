import * as React from 'react';
import i18n from '@emdc/i18n';


i18n.addTranslations('ru', {
  common: {
    commonValue: 'Общая строка'
  },
  App: {
    test: 'Текст App',
    switchTo: {
      en: 'Switch to English',
      ru: 'Переключиться на русский язык',
      de: 'Wechseln Sie zu Deutsch'
    }
  },
  Comp: {
    test: 'Текст Comp'
  }
});

i18n.addTranslations('en', {
  common: {
    commonValue: 'Common string'
  },
  App: {
    test: 'App label',
    switchTo: {
      en: 'Switch to English',
      ru: 'Переключиться на русский язык',
      de: 'Wechseln Sie zu Deutsch'
    }
  },
  Comp: {
    test: 'Component label'
  }
});

i18n.addTranslations('de', {
  common: {
    commonValue: 'De common string'
  },
  App: {
    test: 'Inschrift App',
    switchTo: {
      en: 'Switch to English',
      ru: 'Переключиться на русский язык',
      de: 'Wechseln Sie zu Deutsch'
    }
  }
});


const Comp = () => (
  <div>
    {i18n.translate`{{Comp.test}}`}
  </div>
);

class App extends React.Component {
  render () {
    return (
      <div>
        <div>
          <button onClick={() => i18n.setLanguage('en')}>{i18n.translate`{{App.switchTo.en}}`}</button>
          <button onClick={() => i18n.setLanguage('ru')}>{i18n.translate`{{App.switchTo.ru}}`}</button>
          <button onClick={() => i18n.setLanguage('de')}>{i18n.translate`{{App.switchTo.de}}`}</button>
        </div>
        <div>
          {`Translated label from props: ${i18n.translate`{{App.test}}`}`}
          <br />
          {`Translated label from props: ${i18n.translate`{{.commonValue}}`}`}
          <br />
          {`Translated label from props: ${i18n.translate`{{App.test}}`}`}
        </div>
        <div>
          <Comp />
        </div>
        <div>
          {i18n.translate`{{.commonValue}}`}
        </div>
      </div>
    );
  }
}

export default App;
