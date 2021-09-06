import { get, merge } from './utils';
import TranslationsProvider from './TranslationsProvider';


type Dictionary<T> = {
  [key: string]: T
};

class TranslationsStorage {
  private _currentLanguage: string | null;
  private _fallbackLanguage: string | null;

  private readonly _languages: Dictionary<string>;
  private readonly _data: Dictionary<any>;

  constructor() {
    this._languages = {};
    this._data = {};

    this._currentLanguage = null;
    this._fallbackLanguage = null;
  }

  get currentLanguage (): string | null {
    return this._currentLanguage;
  }

  get fallbackLanguage (): string | null {
    return this._fallbackLanguage;
  }

  setLanguage (language: string) {
    if (!language) {
      if (!this._fallbackLanguage) {
        throw new Error(`[@emdc/i18n] Try to change locale to "${language}", but no fallback locale found.`);
      }
      this._currentLanguage = this._fallbackLanguage;
    } else {
      this._currentLanguage = language;
    }

    if (TranslationsProvider.instance) {
      TranslationsProvider.instance.setLanguage(this._currentLanguage);
    }
  }

  setFallbackLanguage (language: string) {
    this._fallbackLanguage = language;
  }

  addTranslationsForLanguage (language: string, translations: Dictionary<any>) {
    if (!this._languages[language]) {
      this._languages[language] = language;
    }

    if (!this._data[language]) {
      this._data[language] = {};
    }

    this._data[language] = merge(
      this._data[language],
      translations
    );
  }

  addTranslations (translations: Dictionary<any>) {
    const languages = Object.keys(translations);

    languages.forEach((language) => {
      this.addTranslationsForLanguage(language, translations[language]);
    });
  }

  translate (labelPath: string, language: string | null = this.currentLanguage) {
    if (!language) {
      console.warn(`[@emdc/i18n] Invalid locale: "${language}"`);
      return labelPath;
    }

    let value = this._getLabelByLanguage(labelPath, language);

    if (!value) {
      value = this._getLabelByFallbackLanguage(labelPath);
    }

    return value;
  }

  _getLabelByLanguage (labelPath: string, language: string) {
    if (!this._data[language]) {
      return null;
    }

    return get(this._data[language], labelPath);
  }

  _getLabelByFallbackLanguage (labelPath: string) {
    if (!this.fallbackLanguage || !this._data[this.fallbackLanguage]) {
      return null;
    }

    console.warn(`[@emdc/i18n] Using fallback locale "${this.fallbackLanguage}" for translate ${labelPath}`);
    return get(this._data[this.fallbackLanguage], labelPath);
  }
}

export default new TranslationsStorage();

export { TranslationsStorage };
