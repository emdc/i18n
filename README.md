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

2. Set locale:

```js
i18n.actions.changeLocale('en');
```

3. Get translated label:

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

SomeComponent.propTypes = {
  translate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  translate: i18n.getLabel(state)
});

export default connect(mapStateToProps, {})(SomeComponent);
```
