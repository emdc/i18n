import LocaleStorage from './LocaleStorage';
import TranslateProvider from './TranslateProvider';
import localize from './localize';


const i18n = {
  Provider: TranslateProvider,
  changeLocale: (locale) => LocaleStorage.changeLocale(locale),
  translate: (componentName, labelPath) => LocaleStorage.translate(componentName, labelPath)
};

export default i18n;

export {
  localize
};
