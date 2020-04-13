import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  const { btnType, clicked, disabled, children } = props;

  return (
    <button
      className={[classes.Button, classes[btnType]].join(' ')}
      disabled={disabled}
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
