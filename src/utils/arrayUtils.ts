export const toArray = (value) => {
  if (!value) {
    return value;
  }
  return Array.isArray(value) ? value : [value];
};

export const uniqueArray = (values) => {
  if (!values) {
    return values;
  }
  return Array.from(new Set(toArray(values)));
};
