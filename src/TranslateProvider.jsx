import * as React from 'react';


class  TranslateProvider extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      locale: null
    };

    TranslateProvider.instance = this;

    this.setLocale = this.setLocale.bind(this);
  }

  setLocale (locale) {
    this.setState(() => ({locale}));
  }

  render () {
    return React.cloneElement(this.props.children, {
      ...this.props.children.props,
      currentLocale: this.state.locale
    });
  }
}

Object.defineProperty(TranslateProvider, 'instance', {
  enumerable: false,
  configurable: false,
  writable: true
});

export default TranslateProvider;
