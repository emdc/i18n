import * as React from 'react';
import LocaleStorage from './LocaleStorage';


const localize = (translations, name) => {
  return (Component) => {
    const componentName = Component.displayName || Component.name;
    const translateName = name || componentName;
    const displayName = `localize(${componentName})`;

    if (!translateName || translateName === '') {
      throw new Error(`[@emdc/i18n] Component name is "${translateName}". Name should be a non-empty string.`)
    }

    LocaleStorage.addTranslations(translations, translateName);

    const translateFn = (labelPath, locale) => LocaleStorage.translate(translateName, labelPath, locale);

    const Wrap = (props) => (
      <Component
        {...props}
        currentLocale={LocaleStorage.currentLocale}
        setLocale={LocaleStorage.setLocale.bind(LocaleStorage)}
        translate={translateFn}
      />
    );

    Wrap.displayName = displayName;
    Wrap.localizableName = name || componentName;
    Wrap.WrappedComponent = Component;

    Component.translate = translateFn;
    Component.setLocale = LocaleStorage.setLocale.bind(LocaleStorage);

    return Wrap;
  }
};

export default localize;
