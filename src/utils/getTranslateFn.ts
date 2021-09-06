import { combineExtrapolatedString } from './combineExtrapolatedString';


interface ITranslationsStorage {
  translate: (path: string) => string
}

export const getTranslateFn = (translationsStorage: ITranslationsStorage) => (strings: TemplateStringsArray, ...keys: any) => {
  let res = combineExtrapolatedString(strings, keys);

  const templates: string[] = [];

  for (const match of res.matchAll(/{{\S*}}/g)) {
    templates.push(match[0]);
  }

  const translateMatches = templates.reduce((r, t) => {
    let val = t.replaceAll(/[{}]/g, '');

    if (val.startsWith('.')) {
      val = `common${val}`;
    }

    r[t] = translationsStorage.translate(val);

    if (r[t] === null) {
      r[t] = t;
    }

    return r;
  }, {});

  res = Object.keys(translateMatches).reduce((r, t) => {
    return r.replaceAll(t, translateMatches[t]);
  }, res);

  return res;
};
