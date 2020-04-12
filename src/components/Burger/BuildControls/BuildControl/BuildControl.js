import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = (props) => {
  const { label, remove, disabled, add } = props;

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.Less} onClick={remove} disabled={disabled}>
        <i className="fas fa-minus"></i>
      </button>
      <button className={classes.More} onClick={add}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default BuildControl;
