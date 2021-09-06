import { Language } from './constants';
import { TranslationsStorage } from './TranslationsStorage';
import TranslationsProvider from './TranslationsProvider';
import { getTranslateFn, withTranslations } from './utils';


const translationsStorage = new TranslationsStorage();

const addTranslations = (language: string, translations: any) => {
  translationsStorage.addTranslationsForLanguage(language, translations);
};

const i18n = {
  Provider: TranslationsProvider,
  addTranslations,
  setLanguage: translationsStorage.setLanguage.bind(translationsStorage),
  setFallbackLanguage: translationsStorage.setFallbackLanguage.bind(translationsStorage),
  translate: getTranslateFn(translationsStorage)
};

export { Language, withTranslations };

export default i18n;
