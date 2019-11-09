import LocaleStorage from './LocaleStorage';
import localize from './localize';


const i18n = {
  changeLocale: (locale) => LocaleStorage.changeLocale(locale),
  translate: (componentName, labelPath) => LocaleStorage.translate(componentName, labelPath)
};

export default i18n;

export {localize};
