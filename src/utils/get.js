export const get = (object, path, defaultValue = null) => {
  if (!object || typeof object !== 'object') {
    return null;
  }

  if (typeof path !== 'string') {
    return null;
  }

  const nodes = path.split('.');
  let res = object;

  for (let i = 0; i < nodes.length; i += 1) {
    res = res[nodes[i]];
  }

  return res || defaultValue;
};
