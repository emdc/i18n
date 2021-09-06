export const combineExtrapolatedString = (strings: TemplateStringsArray, keys: any[]): string => {
  let res = '';

  for (let i = 0; i < strings.length; i++) {
    if (i >= 1) {
      res += keys[i - 1];
    }

    res += strings[i];
  }

  return res;
};
