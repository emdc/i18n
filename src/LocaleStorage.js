import {get, merge} from 'lodash';
import TranslateProvider from './TranslateProvider';


class LocaleStorage {
  static _storage = new LocaleStorage();

  static get instance () {
    return LocaleStorage._storage;
  }

  constructor() {
    this._locales = {};
    this._data = {};

    this._currentLocale = null;
    this._fallbackLocale = null;
  }

  get currentLocale () {
    return this._currentLocale;
  }

  get fallbackLocale () {
    return this._fallbackLocale;
  }

  changeLocale (locale) {
    if (!locale) {
      if (!this._fallbackLocale) {
        throw new Error(`[@emdc/i18n] Try to change locale to "${locale}", but no fallback locale found.`);
      }
      this._currentLocale = this._fallbackLocale;
    } else {
      this._currentLocale = locale;
    }

    if (TranslateProvider.instance) {
      TranslateProvider.instance.setLocale(this._currentLocale);
    }
  }

  addTranslations (translations, componentName) {
    const locales = Object.keys(translations);

    locales.forEach((localeKey) => {
      if (!this._locales[localeKey]) {
        this._locales[localeKey] = localeKey;
      }

      if (!this._data[localeKey]) {
        this._data[localeKey] = {};
      }

      this._data[localeKey][componentName] = merge(
        this._data[localeKey][componentName],
        translations[localeKey]
      );
    });
  }

  translate (componentName, labelPath, locale = LocaleStorage.instance.currentLocale) {
    if (!componentName || typeof componentName !== 'string') {
      throw new Error(`[@emdc/i18n] Invalid component name: "${componentName}". Name should be a string.`);
    }

    if (!labelPath || typeof labelPath !== 'string') {
      throw new Error(`[@emdc/i18n] Invalid label path for component "${componentName}". Path: "${labelPath}", it should be a string.`);
    }

    if (!locale) {
      console.warn(`Invalid locale: "${locale}"`);
      return labelPath;
    }

    const value = get(this._data[locale][componentName], labelPath, labelPath);

    if (typeof value !== 'string') {
      throw new Error(`[@emdc/i18n] Label by path "${labelPath}" isn't string. Specify the path or check the list of translations.`)
    }

    return value;
  }
}

export default LocaleStorage.instance;
