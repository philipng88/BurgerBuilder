import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  const { btnType, clicked, children } = props;

  return (
    <button
      className={[classes.Button, classes[btnType]].join(' ')}
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
