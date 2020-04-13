import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  const {
    elementType,
    elementConfig,
    label,
    value,
    changed,
    invalid,
    shouldValidate,
    touched,
  } = props;
  const { Input, InputElement, Label, Invalid } = classes;
  const inputClasses = [InputElement];
  let inputElement;

  if (invalid && shouldValidate && touched) inputClasses.push(Invalid);

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map((option) => {
            const { value, displayValue } = option;
            return (
              <option key={value} value={value}>
                {displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
  }

  return (
    <div className={Input}>
      <label className={Label}>{label}</label>
      {inputElement}
    </div>
  );
};
export default Input;
