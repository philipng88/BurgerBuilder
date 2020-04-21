export const updateObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties };
};

export const checkValidity = (value, rules) => {
  const { required, minLength, isEmail } = rules;
  let isValid = true;
  if (required) isValid = value.trim() !== '' && isValid;
  if (minLength) isValid = value.length >= rules.minLength && isValid;
  if (isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
