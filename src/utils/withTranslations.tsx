import React from 'react';
import { TranslationsContext } from './context';


const withTranslations = (Component: any) => {
  function Translatable (props: any) {
    return (
      <TranslationsContext.Consumer>
        {(contexts) => <Component {...props} {...contexts}/>}
      </TranslationsContext.Consumer>
    );
  }

  return Translatable;
};

export { withTranslations };
