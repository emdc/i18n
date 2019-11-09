import {describe, it} from 'mocha';
import {assert, expect} from 'chai';
import i18n, {LocaleStorage} from '@emdc/i18n';


describe('Check library functions', () => {
  it ('Default current locale should be null', () => {
    expect(LocaleStorage.currentLocale).to.be.null;
  });

  it ('Default fallback locale should be null', () => {
    expect(LocaleStorage.fallbackLocale).to.be.null;
  });

  it ('Change locale should work', () => {
    i18n.setLocale('en');
    assert(LocaleStorage.currentLocale, 'en');
  });

  it ('Change fallback locale should work', () => {
    i18n.setFallbackLocale('en');
    assert(LocaleStorage.fallbackLocale, 'en');
  });

  it ('Translate by locale should work correct', () => {
    LocaleStorage.addTranslations({
      en: {test: 'LABEL'}
    }, 'TEST');

    assert(i18n.translate('TEST', 'test'), 'LABEL');
  });

  it ('Translate by specified locale should work correct', () => {
    LocaleStorage.addTranslations({
      en: {test: 'LABEL'},
      de: {test: 'DE'}
    }, 'TEST');

    assert(i18n.translate('TEST', 'test', 'de'), 'DE');
  });

  it ('Translate for fallback locale should work correct', () => {
    LocaleStorage.addTranslations({
      en: {test: 'LABEL'}
    }, 'TEST');

    assert(i18n.translate('TEST', 'test', 'de'), 'LABEL');
  });

  it ('Translate for unresolved label should return label path', () => {
    LocaleStorage.addTranslations({
      en: {test: 'LABEL'}
    }, 'TEST');

    assert(i18n.translate('TEST', 'someLabel'), 'someLabel');
  });

  it ('Get label by path should work correct', () => {
    LocaleStorage.addTranslations({
      en: {test: {label: 'LABEL'}}
    }, 'TEST');

    assert(i18n.translate('TEST', 'test.label'), 'LABEL');
  });
});
