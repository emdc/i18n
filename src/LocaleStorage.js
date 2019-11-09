import {get, merge} from './utils';
import TranslateProvider from './TranslateProvider';


class LocaleStorage {
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

  setLocale (locale) {
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

  setFallbackLocale (locale) {
    this._fallbackLocale = locale;
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

  translate (componentName, labelPath, locale = this.currentLocale) {
    if (!componentName || typeof componentName !== 'string') {
      throw new Error(`[@emdc/i18n] Invalid component name: "${componentName}". Name should be a string.`);
    }

    if (!labelPath || typeof labelPath !== 'string') {
      throw new Error(`[@emdc/i18n] Invalid label path for component "${componentName}". Path: "${labelPath}", it should be a string.`);
    }

    if (!locale) {
      console.warn(`[@emdc/i18n] Invalid locale: "${locale}"`);
      return labelPath;
    }

    let value = this._getLabelByLocale(componentName, labelPath, locale);

    if (!value) {
      value = this._getLabelByFallbackLocale(componentName, labelPath);
    }

    if (typeof value !== 'string') {
      throw new Error(`[@emdc/i18n] Label by path "${labelPath}" isn't string. Specify the path or check the list of translations.`)
    }

    return value;
  }

  _getLabelByLocale (componentName, labelPath, locale) {
    if (!this._data[locale]) {
      return null;
    }

    return get(this._data[locale][componentName], labelPath)
  }

  _getLabelByFallbackLocale (componentName, labelPath) {
    if (!this.fallbackLocale || !this._data[this.fallbackLocale]) {
      return labelPath;
    }

    console.warn(`[@emdc/i18n] Using fallback locale "${this.fallbackLocale}" for translate ${componentName}:${labelPath}`);
    return get(this._data[this.fallbackLocale][componentName], labelPath, labelPath);
  }
}

export default new LocaleStorage();

export {LocaleStorage};
