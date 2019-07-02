# i18n

## Dependencies

* redux
* lodash

## Benefits

* Very simple usage. Add reducer and use provided methods.
* Translations are divided between components.
* No HOC needed with React.
* You can use prebuild translations or download from server, or ... or something else. The library requires only the result object with the translations.

## Usage

### Redux only

1. Create store with i18n reducer:

```js
const store = createStore(
  combineReducers({
    ...i18n.reducers
  }),
  {},
  composeEnhancers(applyMiddleware(thunk))
);
```

2. Save translations:

```js
i18n.actions.changeTranslation('componentName', {test: 'Test label'}, 'en');
i18n.actions.changeTranslation('componentName', {test: 'Тестовая надпись'}, 'ru');
```

3. Set locale:

```js
i18n.actions.changeLocale('en');
```

4. Get translated label:

```js
console.log(i18n.translate('componentName', 'some.label'));
```

### React

You can see working example in examples dir in this repo. But you can see a short example with React below.

1. Create store with i18n reducer:

```js
const store = createStore(
  combineReducers({
    ...i18n.reducers
  }),
  {},
  composeEnhancers(applyMiddleware(thunk))
);
```

2. Use in your React components:

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import i18n from '@emdc/i18n';


class SomeComponent extends React.Component {
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

SomeComponent.propTypes = {
  translate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  translate: i18n.getLabel(state)
});

export default connect(mapStateToProps, {})(SomeComponent);
```
