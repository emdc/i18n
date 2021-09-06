import * as React from 'react';
import { TranslationsContext, ITranslationsContext } from './utils/context';


interface ITranslationsProviderProps {
  children: React.ReactNode
}

interface ITranslationsProviderState {
  context: ITranslationsContext;
}

class TranslationsProvider extends React.PureComponent<ITranslationsProviderProps, ITranslationsProviderState> {
  static instance: TranslationsProvider;

  constructor (props: ITranslationsProviderProps) {
    super(props);

    this.state = {
      context: {
        language: null
      }
    };

    TranslationsProvider.instance = this;

    this.setLanguage = this.setLanguage.bind(this);
  }

  setLanguage (language: string) {
    this.setState(() => ({ context: { language } }));
  }

  render () {
    const { children } = this.props;
    const { context } = this.state;

    return (
      <TranslationsContext.Provider value={context}>
        {children}
      </TranslationsContext.Provider>
    );
  }
}

Object.defineProperty(TranslationsProvider, 'instance', {
  enumerable: false,
  configurable: false,
  writable: true
});

export default TranslationsProvider;
