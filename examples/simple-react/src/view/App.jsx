import * as React from 'react';
import i18n, {localize} from '@emdc/i18n';


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
    test: 'App label'
  },
  ru: {
    test: 'Текст App'
  }
};

const Comp = localize(translationsComp, 'Comp')(({translate}) => (
  <div>
    {translate('test')}
  </div>
));


@localize(translationsApp)
class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={() => i18n.changeLocale('en')}>{'Switch to English'}</button>
          <button onClick={() => i18n.changeLocale('ru')}>{'Переключиться на русский язык'}</button>
        </div>
        <div>
          {`Translated label: ${App.translate('test')}`}
          <Comp />
        </div>
      </div>
    );
  }
}

export default App;
