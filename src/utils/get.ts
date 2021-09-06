export const get = (object: object, path: string, defaultValue: any = null) => {
  if (!object || typeof object !== 'object') {
    return null;
  }

  const nodes = path.split('.');
  let res = object;

  for (let i = 0; i < nodes.length; i += 1) {
    if (res[nodes[i]]) {
      res = res[nodes[i]];
    } else {
      return defaultValue;
    }
  }

  return res || defaultValue;
};
