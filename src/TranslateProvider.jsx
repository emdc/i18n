import * as React from 'react';


class  TranslateProvider extends React.PureComponent {
  static _instance = null;

  static get instance () {
    return TranslateProvider._instance;
  }

  static set instance (value) {
    TranslateProvider._instance = value;
  }

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

export default TranslateProvider;
