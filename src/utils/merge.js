const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);

export const merge = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (target === null || typeof target === 'undefined') {
    target = {};
  }

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return merge(target, ...sources);
};
