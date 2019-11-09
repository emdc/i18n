import {describe, it} from 'mocha';
import {assert, expect} from 'chai';
import {LocaleStorage} from '@emdc/i18n/LocaleStorage';


describe('Check library functions', () => {
  it ('Default current locale should be null', () => {
    const storage = new LocaleStorage();

    expect(storage.currentLocale).to.be.null;
  });

  it ('Default fallback locale should be null', () => {
    const storage = new LocaleStorage();

    expect(storage.fallbackLocale).to.be.null;
  });

  it ('Change locale should work', () => {
    const storage = new LocaleStorage();

    storage.setLocale('en');

    assert(storage.currentLocale, 'en');
  });

  it ('Change fallback locale should work', () => {
    const storage = new LocaleStorage();

    storage.setFallbackLocale('en');

    assert(storage.fallbackLocale, 'en');
  });

  it ('Translate by locale should work correct', () => {
    const storage = new LocaleStorage();

    storage.setLocale('en');
    storage.addTranslations({
      en: {test: 'LABEL'}
    }, 'TEST');

    assert(storage.translate('TEST', 'test'), 'LABEL');
  });

  it ('Translate by specified locale should work correct', () => {
    const storage = new LocaleStorage();

    storage.setLocale('en');
    storage.addTranslations({
      en: {test: 'LABEL'},
      de: {test: 'DE'}
    }, 'TEST');

    assert(storage.translate('TEST', 'test', 'de'), 'DE');
  });

  it ('Translate for fallback locale should work correct', () => {
    const storage = new LocaleStorage();

    storage.setLocale('en');
    storage.setFallbackLocale('en');
    storage.addTranslations({
      en: {test: 'LABEL'}
    }, 'TEST');

    assert(storage.translate('TEST', 'test', 'de'), 'LABEL');
  });

  it ('Translate for unresolved label should return label path', () => {
    const storage = new LocaleStorage();

    storage.setLocale('en');
    storage.addTranslations({
      en: {test: 'LABEL'}
    }, 'TEST');

    assert(storage.translate('TEST', 'someLabel'), 'someLabel');
  });

  it ('Get label by path should work correct', () => {
    const storage = new LocaleStorage();

    storage.setLocale('en');
    storage.addTranslations({
      en: {test: {label: 'LABEL'}}
    }, 'TEST');

    assert(storage.translate('TEST', 'test.label'), 'LABEL');
  });
});
