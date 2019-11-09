# i18n

## Dependencies

None

## Benefits

* Very simple usage. Add reducer and use provided methods.
* Translations are divided between components.

## API

* `i18n.setLocale(locale)`. Argument `locale` must be a string. This function change locale for all app.
* `Component.setLocale(locale)`. Is same.
* `this.props.setLocale(locale)`. Is same.

* `i18n.setFallbackLocale(locale)`. By default fallback locale is `null`. Warning! This way created for workaround confuses of lost translations. Normal way is correct labels for all used locales.

* `i18n.translate(componentName, labelPath, locale = currentLocale)`. If the label isn't found by labelPath, labelPath will be returned. The return labelPath is necessary if the label is not found needed, because this is an easy way to find the lost labels.
    * `componentName` tells from what component will use translations.
    * `labelPath` tells from what path by component branch will get result label.
    * `locale` tells what locale we should use. By default it's current locale (by function `setLocale`).
* `Component.translate(labelPath, locale = currentLocale)`.
* `this.props.translate(labelPath, locale = currentLocale)`.

## Usage

You can see simple example in `examples/simple-react` folder in this repo. But key points are:

1. Set initial locale, optionally fallback locale in your index.jsx file, and Provider:

```jsx
import i18n from '@emdc/i18n';

// initial locale
i18n.setLocale('en');

// optionally fallback locale
i18n.setFallbackLocale('en');

ReactDOM.render(
<AppContainer>
  <i18n.Provider>
    <AppComponent />
  </i18n.Provider>
</AppContainer>,
element
);
```

2. Use in components by two ways:

```jsx
import * as React from 'react';
import i18n from '@emdc/i18n';


const translations = {
  en: {
    test: 'Component label'
  },
  ru: {
    test: 'Текст Comp'
  }
};

// You shuould provide component name for functional components and use 'translate' func from props
const Comp = i18n.localize(translations, 'Comp')(({translate}) => (
  <div>
    {translate('test')}
  </div>
));
```

```jsx
import * as React from 'react';
import i18n from '@emdc/i18n';


const translations = {
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

// 1. You can use function 'localize' as decorator
// 2. You can omit the component name for regular components
// 3. You can use 'translate' function from component class: App.translate, from props or from i18n module.
// 4. You can change locale by function 'setLocale' from i18n module or from props.
// 5. You can specify locale for translate.

@i18n.localize(translations)
class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={() => i18n.setLocale('en')}>
            {App.translate('switchTo.en')}
          </button>

          <button onClick={() => this.props.setLocale('ru')}>
            {translate('switchTo.ru')}
          </button>

          <button onClick={() => i18n.setLocale('de')}>
            {i18n.translate('App', 'switchTo.de')}
          </button>
        </div>
        <div>
          {`Translated label from class: ${App.translate('test')}`}
          <br />
          {`Translated label from props: ${this.props.translate('test')}`}
          <br />

        </div>
      </div>
    );
  }
}

export default App;
```
