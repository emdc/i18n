import { describe, it } from 'mocha';
import { assert, expect } from 'chai';
import { TranslationsStorage } from '../src/TranslationsStorage';


describe('Check library functions', () => {
  it ('Default current locale should be null', () => {
    const storage = new TranslationsStorage();

    expect(storage.currentLanguage).to.be.null;
  });

  it ('Default fallback locale should be null', () => {
    const storage = new TranslationsStorage();

    expect(storage.fallbackLanguage).to.be.null;
  });

  it ('Change locale should work', () => {
    const storage = new TranslationsStorage();

    storage.setLanguage('en');

    assert(storage.currentLanguage, 'en');
  });

  it ('Change fallback locale should work', () => {
    const storage = new TranslationsStorage();

    storage.setFallbackLanguage('en');

    assert(storage.fallbackLanguage, 'en');
  });

  it ('Translate by locale should work correct', () => {
    const storage = new TranslationsStorage();

    storage.setLanguage('en');
    storage.addTranslations({en: {test: 'LABEL'}});

    assert(storage.translate('test'), 'LABEL');
  });

  it ('Translate by specified locale should work correct', () => {
    const storage = new TranslationsStorage();

    storage.setLanguage('en');
    storage.addTranslations({
      en: {test: 'LABEL'},
      de: {test: 'DE'}
    });

    assert(storage.translate('test', 'de'), 'DE');
  });

  it ('Translate for fallback locale should work correct', () => {
    const storage = new TranslationsStorage();

    storage.setLanguage('en');
    storage.setFallbackLanguage('en');
    storage.addTranslations({
      en: {test: 'LABEL'}
    });

    assert(storage.translate('test', 'de'), 'LABEL');
  });

  it ('Translate for unresolved label should return label path', () => {
    const storage = new TranslationsStorage();

    storage.setLanguage('en');
    storage.addTranslations({
      en: {test: 'LABEL'}
    });

    assert(storage.translate('test'), 'someLabel');
  });

  it ('Get label by path should work correct', () => {
    const storage = new TranslationsStorage();

    storage.setLanguage('en');
    storage.addTranslations({
      en: {test: {label: 'LABEL'}}
    });

    assert(storage.translate('test.label'), 'LABEL');
  });
});
