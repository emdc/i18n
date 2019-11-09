import LocaleStorage from './LocaleStorage';
import TranslateProvider from './TranslateProvider';
import localize from './localize';


const i18n = {
  Provider: TranslateProvider,
  localize,
  setLocale: LocaleStorage.setLocale.bind(LocaleStorage),
  setFallbackLocale: LocaleStorage.setFallbackLocale.bind(LocaleStorage),
  translate: LocaleStorage.translate.bind(LocaleStorage)
};

export default i18n;
